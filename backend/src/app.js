require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http")
const app = express();
const initializeSocket = require("./utils/socket");
const path = require('path')

const _dirname = path.resolve()

const corsOptions = {
  origin: "https://devsconnect-v1.onrender.com",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


const server = http.createServer(app)
initializeSocket(server)


const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/userRouter");
const chatRouter = require("./routers/chatRouter")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',
  (_,res)=>{
  res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'))
})

//connecting DB and server starting
connectDB()
  .then(() => {
    console.log("database connected");
    server.listen(process.env.PORT, () => {
      console.log("server is listenig");
    });
  })
  .catch((err) => {
    console.error("database isnt connected " + err);
  });

