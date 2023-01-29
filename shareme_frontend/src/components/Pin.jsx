import React,{useState} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {MdDownloadForOffline} from 'react-icons/md';
import {AiTwotoneDelete} from 'react-icons/ai';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs';
import {client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';
import pro from '../assets/clipart56690.png'

const Pin = ({pin:{postedBy,image,_id,destination,save,pin}}) => {
    const [postHovered, setPostHovered] = useState(false);

    const navigate = useNavigate();
    const user = fetchUser();
    //    const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length;
    const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.googleId))?.length;

  
    const savePin = (id) => {
        if(!alreadySaved) {

            client
                .patch(id)
                .setIfMissing({save: []})
                .insert('after','save[-1]',[{
                    _key:uuidv4(),
                    userId: user?.googleId,
                    postedBy:{
                        _type:'postedBy',
                        _rel: user?.googleId
                    }
                    
                }])
                
                .commit()
                .then(() => {
                    window.location.reload();
                    window.location.reload();
                    
                })
                
        }
        
    }
const deletePin = (id) => {
    client
         .delete(id)
         .then(()=>{
            window.location.reload();
            window.location.reload();
         })
}

  return (
    <div className='pin'>
        
        <div onMouseEnter={()=>setPostHovered(true)} 
             onMouseLeave={()=>setPostHovered(false)}
             onClick={()=>navigate(`/pin-detail/${_id}`)}
             className='post'>


          <img className='postimage' src={urlFor(image).width(250).url()} alt=""/>


          {postHovered && (
            <div className='postcontent' style={{height:'100%'}}>
                <div className='postup' >
                    <div className='postsavelink'>
                        <a href={`${image?.asset?.url}?dl=`} download onClick={(e)=>e.stopPropagation()}><MdDownloadForOffline /></a>
                    </div>

                    {alreadySaved ? (
                        <button className='postsavebutton' type='button' >
                           {save?.length} Saved
                        </button>
                    ): (
                        <button className='postsavebutton' onClick={(e)=>{
                            e.stopPropagation();
                            savePin(_id);
                          
                        }} 
                        type='button' >
                            Save
                        </button>
                    )}
             
                </div>
                <div className='postbottom'>
                    {destination && (
                        <a className='postdestination' href={destination} target="_blank" rel="noreferrer">
                            <BsFillArrowUpRightCircleFill />
                            {destination.length > 15 ? `${destination.slice(0,15)}...` : destination}
                        </a>
                    )}
                    {postedBy?.id === user?.googleId &&  (
                        <button className='postdelete' type='button' 
                                onClick={(e)=>{
                                e.stopPropagation();
                                deletePin(_id);
                                
                            }} >
                                <AiTwotoneDelete />

                        </button>
                    )}
                
                </div>
            </div>
          )}

        </div>
        <Link to={`user-profile/${postedBy?._id}`} className='postinfo'>
            <img  src={postedBy?.image} alt="" />
            <h3 className='postinfop' >{postedBy?.userName}</h3>
        </Link>
    </div>
  )
}

export default Pin
