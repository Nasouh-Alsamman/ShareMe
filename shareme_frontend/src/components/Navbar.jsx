import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {IoMdAdd , IoMdSearch} from 'react-icons/io'

const Navbar = ({searchTerm , setSearchTerm , user}) => {
  const navigate = useNavigate()

  if(!user) return null;
  return (
    <div className='navbar'>
        <IoMdSearch  fontSize={21} className='IoMdSearch' />
        <input type="text" onChange={(e)=> setSearchTerm(e.target.value)} placeholder="Search" value={searchTerm} onFocus={()=>navigate('/search')} />      
    </div>
  )
}

export default Navbar
