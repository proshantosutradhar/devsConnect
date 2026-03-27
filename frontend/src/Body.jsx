import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";

function Body() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  

  const fetchUser = async () => {
    if (user) return;
      const publicPaths = ["/login", "/signup"];
  if (!user && !publicPaths.includes(location.pathname)) {
     <Navigate to="/login" replace />;
  }
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/login");
      console.error(err);
    }
  };
  useEffect(() => {
      if (location.pathname === "/login" || location.pathname === "/signup") return;

    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Body;
