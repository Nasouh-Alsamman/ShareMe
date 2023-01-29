import React,{useState,useEffect,useRef } from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link , Route, Routes} from 'react-router-dom'
import {Sidebar , UserProfile} from '../components'
import { client } from '../client';
import Pins from './Pins'
import { userQuery } from '../utils/data'
import {IoMdAdd,IoMdSearch } from 'react-icons/io'
import { fetchUser } from '../utils/fetchUser'
import {koko} from '../assets/clipart56690.png'



const Home = () => {; 
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState();
  const scrollRef = useRef(null);
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    console.log(userInfo?.sub)
    client.fetch(query)
    .then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
  scrollRef.current.scrollTo(0,0)
  },[])
  

  
  return (
    <div className='home'>
      <div className='Header'>
        <HiMenu className='HiMenu' onClick={()=> setToggleSidebar(true)}/>
        <div>
        <Link to="/" >
             <img className='mainlogo' src='clipart56690.png' alt="" />

      </Link>

        </div>

        

        <div className='two'>
        

        <Link to={`user-profile/${userInfo?.sub}`}>
          <img className='profilepicture' src={userInfo?.picture} alt=" hola " />
        </Link>
        {/*  <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link> */}
        <Link to='create-pin'>
          <IoMdAdd className='IoMdAdd' />
          </Link>
          </div>
      </div>
      {toggleSidebar && (
        <div className='sidemove'>
          <div className='x'>
            <AiFillCloseCircle onClick={()=>setToggleSidebar(false)}/>
          </div>
          <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
        </div>
      )}
      <div className='scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />}/>
          <Route path='/*' element={<Pins user={user && user} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home
