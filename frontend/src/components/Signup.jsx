import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Signup() {
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");
  const [userFirstname, setUserFirstname] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = useSelector((store)=>store.user)
  
 useEffect(() => {
  if (token && user?.firstName) {
    navigate("/feed");
  }
}, []);

  const handleClick = async () => {
    if (!userFirstname || !userLastName || !emailId || !userPassword) {
      setError("All fields are required");
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: userFirstname,
          lastName: userLastName,
          email: emailId,
          password: userPassword,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message === "user not added") {
    setError("Enter valid details");
} else {
    setError(err.response?.data?.message);
}
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title text-2xl">Join DevsConnect</h2>
          <input
            type="text"
            value={userFirstname}
            onChange={(e) => setUserFirstname(e.target.value)}
            placeholder="FirstName"
            className="input border mt-3 border-white input-ghost"
          />

          <input
            type="text"
            value={userLastName}
            onChange={(e) => setUserLastName(e.target.value)}
            placeholder="LastName"
            className="input border mt-3 border-white input-ghost"
          />

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
          <div className="card-actions justify-center mb-4">
            <button className="btn btn-primary" onClick={handleClick}>
              SignUp
            </button>
          </div>
          <h4>
            Already Registered?{" "}
            <Link to="/login" className="text-blue-500 font-semibold">
              Login
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Signup;
