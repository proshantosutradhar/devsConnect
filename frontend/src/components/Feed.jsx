import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import feedBanner from "../assets/feedBanner.jpg";
import { useState } from "react";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed?page=1&limit=200", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  const firstUser = feed?.[0];

  if (loading) {
    return (
      <div
        className="flex w-full h-[88vh] justify-center"
        style={{
          backgroundImage: `url(${feedBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <li className="list mt-10 bg-base-300 p-10 md:w-1/3 h-10 rounded-box shadow-md flex justify-center items-center">
          <div>Loading.....</div>
        </li>
      </div>
    );
  }
  if (feed.length === 0) {
    return (
      <div
        className="flex w-full h-[88vh] justify-center"
        style={{
          backgroundImage: `url(${feedBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <li className="list mt-10 bg-base-300 p-10 md:w-1/3 h-10 rounded-box shadow-md flex justify-center items-center">
          <div>No new users to show.</div>
        </li>
      </div>
    );
  }
  return (
    feed && (
      <div
        className="flex w-full h-[88vh] justify-center items-center"
        style={{
          backgroundImage: `url(${feedBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {firstUser ? (
          <UserCard key={firstUser._id} user={firstUser} />
        ) : (
          <div className="flex justify-center mt-10 items-center">
            <li className="list bg-base-300 w-1/3 h-10 rounded-box shadow-md flex justify-center items-center">
              <div>Feed Loading.....</div>
            </li>
          </div>
        )}
      </div>
    )
  );
}

export default Feed;
