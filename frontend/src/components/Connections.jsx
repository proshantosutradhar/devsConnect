import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import { Link } from 'react-router-dom'

function Connections() {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections)

    const fetchConnections = async()=>{
       try{
         const res = await axios.get(BASE_URL + '/user/requests/matches/',{withCredentials: true})
        dispatch(addConnections(res.data?.data))
       }catch(err){
        console.log(err)
       }

    }
    useEffect(()=>{
        fetchConnections()
    },[])
  if(!connections || connections.length == 0) {
    return <div className='flex justify-center mt-10 items-center'>
         <li className="list bg-base-300 w-1/3 h-10 rounded-box shadow-md flex justify-center items-center">
            <div>No Connections Found</div>
   
  </li>
    </div>
  };

  return <div className='flex flex-col p-7'>
    <div className='text-2xl font-semibold m-auto'>Connections</div>
    {connections.map((e)=> {
        return <div key={e._id} className='flex h-33 mt-5 justify-center items-center'>
            <ul className="list bg-base-300 h-full md:w-1/3 rounded-box shadow-md">
  
  
  <li className="list-row">
    <div><img className="size-10 object-cover rounded-box" src={e.photoUrl}/></div>
    <div className="list-col-grow">
      <div className='font-semibold'>{e.firstName} {e.lastName}</div>
      <div className="text-xs font-semibold capitalize opacity-60">{e.age} years, {e.gender}</div>
      <div className='text-xs md:text-base'>{e.bio}</div>
      
    </div>
    <button className="btn btn-soft btn-success">  <Link to={"/chat/"+ e._id} > Message</Link></button>
  </li>
  
</ul></div>
    })}
  </div>

}

export default Connections
