import React,{useState, useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery,searchQuery } from '../utils/data'
import Spinner from './Spinner'
import {IoMdSearch } from 'react-icons/io'
import {Link, useNavigate} from 'react-router-dom'




const Search = ({searchTerm , setSearchTerm , user}) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  useEffect(() => {
  if(searchTerm){
    setLoading(true);
    const query = searchQuery(searchTerm.toLowerCase())
    client.fetch(query)
   .then((data)=>{
    setPins(data);
    setLoading(false);
   })
  }
  else{
client.fetch(feedQuery)
   .then((data)=>{
    setPins(data);
    setLoading(false);
   })
  }
  }, [searchTerm])
  

  return (
<div>
  {loading &&<Spinner message='Searching for Pins' />}
  {pins?.length !== 0 && <MasonryLayout pins={pins} />}
  {pins?.length ===0 && searchTerm !== '' && !loading && 
  <div>
    No Pins Found!
  </div>
  }
  <div className='navbar'>
  <IoMdSearch  fontSize={21} className='IoMdSearch' />
  <input type="text" onChange={(e)=> setSearchTerm(e.target.value)} placeholder="Search" value={searchTerm} onFocus={()=>navigate('/search')} />  
  </div> 

        {/* <div className='searchbody'>
            <h1>hola</h1>
        </div>     */}

 </div>
    
    )
}

export default Search