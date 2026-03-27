import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import banner from "../assets/banner.png"


function Login() {
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = useSelector((store)=>store.user)

  const handleClick = async () => {
    if (!emailId || !userPassword) {
      setError("All fields are required");
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password: userPassword,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      localStorage.setItem("token", res.data.token);
      navigate("/feed");
    } catch (err) {
      console.error(err);
      setError(err.response?.data);
    }
  };
if (token && user) {
    return <Navigate to="/feed" replace />;
  }
  return (
    <div className="flex relative items-center justify-center w-full h-[88vh] overflow-y-hidden" style={{ backgroundImage: `url(${banner})`,backgroundSize: "cover",
  backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="card card-border bg-base-300 w-96 -mt-30">
        <div className="card-body">
          <h2 className="card-title text-2xl">Login</h2>
          <input
            type="text"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Email"
            className="input border mt-3 border-white input-ghost"
          />
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setuserPassword(e.target.value)}
            placeholder="Password"
            className="input border border-white mb-3 mt-3 input-ghost"
          />
          <p className="text-red-600 font-semibold">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary mb-4" onClick={handleClick}>
              Login
            </button>
          </div>
          <h4>
            New Here?{" "}
            <Link to="/signup" className="text-blue-500 font-semibold">
              SignUp Today!
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
