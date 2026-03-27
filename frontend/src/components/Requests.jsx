import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const handleRequest = async(status, _id)=>{
 try {
      const res = await axios.patch(`${BASE_URL}/request/review/${status}/${_id}`,{}, {
        withCredentials: true,
      });
      dispatch(removeRequests(_id))
    } catch (err) {
      console.log(err);
    }
  }
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
    
  }, []);

  if (requests?.length == 0) {
    return (
      <div className="flex justify-center mt-10 items-center">
        <li className="list bg-base-300 p-4 md:w-1/3 h-10 rounded-box shadow-md flex justify-center items-center">
          <div>No Connections Requests</div>
        </li>
      </div>
    );
  }
  return (
    <div><div className='w-full flex justify-center text-2xl font-semibold my-4'>Requests</div>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        

  {requests &&
    requests.map((e) => (
      <div
        key={e._id}
        className="flex flex-col bg-base-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <li className="flex sm:flex-row gap-4 sm:gap-6">
          <div className="shrink-0">
            <img
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
              src={e.photoUrl}
              alt={`${e.firstName} ${e.lastName}`}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div className="font-semibold text-lg capitalize">
                {e.firstName} {e.lastName}
              </div>
              <div className="text-sm font-medium text-gray-500 mt-1">
                {e.age} years, {e.gender}
              </div>
              <div className="mt-2 text-gray-300 text-sm sm:text-base">
                {e.bio}
              </div>
            </div>
          </div>
        </li>
        <div className="flex justify-center sm:justify-end gap-4 mt-4">
          <button
            className="btn btn-error btn-outline w-24"
            onClick={() => handleRequest("rejected", e?._id)}
          >
            Reject
          </button>
          <button
            className="btn btn-success btn-outline w-24"
            onClick={() => handleRequest("accepted", e?._id)}
          >
            Accept
          </button>
        </div>
      </div>
    ))}
</div>
</div>
  );
}

export default Requests;
