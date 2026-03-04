const express = require("express");

const connectDB = require("./config/database");
const cookieParser = require("cookie-parser")

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile")
const requestRouter = require("./routers/request")


app.use('/',authRouter);
app.use('/', profileRouter)
app.use('/', requestRouter)




//connecting db and server starting
connectDB()
  .then(() => {
    console.log("database connected");
    app.listen(port, () => {
      console.log("server is listenig");
    });
  })
  .catch((err) => {
    console.error("database isnt connected " + err);
  });

