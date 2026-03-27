import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import { useLocation } from 'react-router-dom';

function UserCard({user}) {
    const {firstName, lastName, photoUrl, age, gender, bio, skills, _id } = user;

    const dispatch = useDispatch()
    const location = useLocation()
    const handleClick=async(status, _id)=>{
            dispatch(removeFeed(_id))

        try{
             const res = await axios.post(`${BASE_URL}/request/${status}/${_id}`,{}, {
        withCredentials: true,
      });

        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
  <figure className='object-cover'>
    <img className='max-h-70 w-full object-cover object-center'
      src={photoUrl || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?semt=ais_hybrid&w=740&q=80"} 
      alt="user" />
  </figure>
  <div className="card-body">
    <h2 className="card-title capitalize">{firstName} {lastName}</h2>
    <div className='font-medium text-gray-500 capitalize'>{age} Years, {gender|| "Not specified"}</div>

    <p>{bio}</p>
            <div className='text-sm text-gray-500'>Skills: {skills} </div>

   {location.pathname !== "/profile" &&  <div className="card-actions justify-center mt-4">
        <button className="btn btn-soft btn-error" onClick={()=>handleClick("ignored",_id)}>Ignored</button>
      <button className="btn btn-soft btn-success" onClick={()=>handleClick("interested",_id)}>Interested</button>
    </div>}
  </div>
</div>
    </div>
  )
}

export default UserCard
