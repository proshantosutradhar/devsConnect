import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Body from "./Body";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ProtectedRoute from "./utils/ProtectedRoute";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    
    <Routes>
  <Route path="/" element={<Body />}>
    <Route index element={<Login />} />
    <Route path="*" element={<ProtectedRoute />} />
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />

    <Route element={<ProtectedRoute />}>
      <Route path="feed" element={<Feed />} />
      <Route path="connections" element={<Connections />} />
      <Route path="requests" element={<Requests />} />
      <Route path="changepassword" element={<ChangePassword />} />
      <Route path="profile" element={<Profile />} />
      <Route path="chat/:targetId" element={<ChatBox />} />
    </Route>

  </Route>
</Routes>
    
  );
}

export default App;