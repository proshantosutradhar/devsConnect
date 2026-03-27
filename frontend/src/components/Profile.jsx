import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

function Profile() {

    const user = useSelector((store)=>store.user);
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [bio, setBio] = useState(user.bio);
    const [skills, setSkills] = useState(user.skills)
    const [gender, setGender] = useState(user.gender);
    const [age, setAge] = useState(user.age)

    const [toast, setToast] = useState(false)
    const [errMessage, setErrMessage] = useState()

    const handleUpdate = async ()=>{
        try{
            const res = await axios.patch(BASE_URL +'/profile/edit',{
            firstName, lastName, photoUrl, bio, skills, gender, age
        }, {withCredentials: true});

        dispatch(addUser(res?.data?.data))
        setToast(true)
        setTimeout(()=>{
            setToast(false)
        }, 1000)

        }catch(error){
             const msg =
    error?.response?.data ||
    "Something went wrong";
      setErrMessage(msg);

      setTimeout(()=>{
              setErrMessage(null);
        }, 4000)
              console.log(error.response);

        }
    }
  return (
   <>
   {
    user &&  <div className='flex flex-col md:flex-row m-auto mb-20 gap-10 justify-center items-center'>
        <div className="card card-dash bg-base-200 w-96 mt-20">
  <div className="card-body">
    <h2 className="card-title">Edit Profile</h2>
    <div className='flex gap-5 justify-center items-center flex-col'>
        <input type="text"  maxLength={15} value={firstName} onChange={(e)=> setFirstName(e.target.value)} placeholder="First Name" className="input" />
        <input type="text" maxLength={15} value= {lastName} onChange={(e)=> setLastName(e.target.value)} placeholder="Last Name" className="input" />
        <input type="text"  maxLength={2}  value={age} onChange={(e)=> setAge(e.target.value)} placeholder="Age" className="input" />
        <input type="text" value={skills} onChange={(e)=> setSkills(e.target.value)} placeholder="Skills" className="input" />
        <input type="text" value={bio} onChange={(e)=> setBio(e.target.value)} placeholder="Bio" className="input" />
        <input type="text" value= {gender} onChange={(e)=> setGender(e.target.value)} placeholder="gender" className="input" />
        <input type="text" value={photoUrl} onChange={(e)=> setPhotoUrl(e.target.value)} placeholder="Photo Url" className="input" />

        <p className='bg-red-700'>{errMessage}</p>

    </div>
    <div className="card-actions justify-center mt-5">
      <button className="btn btn-primary" onClick={handleUpdate}>Update Profile</button>
    </div>
        {toast && 
      <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated Successfully.</span>
  </div>
</div>
    }


  </div>
</div>
<div>
    <UserCard user={{firstName, lastName, photoUrl, age, gender, bio, skills}}/>
</div>
      
    </div>
   }
   </>
  )
}

export default Profile
