import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import logo from '../assets/pngwing.com (2).png'
import pinDetail from './PinDetail'

import { categories } from '../utils/data'

const Sidebar = ({user,closeToggle}) => {
    const handleCloseSidebar = ()=> {
        if(closeToggle) closeToggle(false)
    }
  return (
    <div className='sidebar' >
      <Link to="/" onClick={handleCloseSidebar}>
        <img className="sidebarlogo " src={logo} alt=""/>
      </Link>
      
      <div>
        <NavLink onClick={handleCloseSidebar} to="/" className={({ isActive}) => isActive ? "isActiveStyle" : "isNotActiveStyle"}>
          <div className='sidebarhome'>
            <RiHomeFill />
           <h1>Home</h1>
           </div>
        </NavLink>
        <p>Discover Categories</p>
        {categories.slice(0,categories.length - 1).map((category)=>(
          <NavLink key={category.name} onClick={handleCloseSidebar} className={({ isActive}) => isActive ? "isActiveStyle" : "isNotActiveStyle"} to={`/category/${category.name}`}>
              {category.name}
              <img className='sidebarimg' src={category.image} alt="" />
          </NavLink>
        ))}
      </div>
      <div className='sideprofile'>
      
            <Link to={`user-profile/${user?._id}`} className='profileholder' onClick={handleCloseSidebar}>
              <img className='profilepicture' src={user?.image} alt="user-profile" />
              <p>{user?.userName}</p>
            </Link>


      
      </div>
    </div>
  )
}

export default Sidebar
