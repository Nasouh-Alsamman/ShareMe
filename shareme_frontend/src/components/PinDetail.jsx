import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs';


import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import Sidebar from './Sidebar';

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
       
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user?._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) {
    return (
      <Spinner message="Showing pin" />
    );
  }

  return (
    <>
   {pinDetail && (
        <div className='pindetail'>
          <div >
            <img
              className='pindetaiimg'
              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
            />
          </div>
          <div className='pindetaildetail' >
            <div className='pindetailfirst' >
                
                  <a
                    href={`${pinDetail.image.asset.url}?dl=`}
                    download className='pindetaidownlogo'>
                    <MdDownloadForOffline />
                  </a>
              <a className='pindetailsource' href={pinDetail.destination} target="_blank" rel="noreferrer">
              <BsFillArrowUpRightCircleFill />
                {pinDetail.destination.slice(0,15)}
              </a>
            </div>
            <div className='pindetaisecond'>
           
              <div className='pindetaisecond2'>
                <h1 > {pinDetail.title} </h1>
                <p>{pinDetail.about}</p>
              </div>
              <Link className='pindetailprofile' to={`/user-profile/${pinDetail?.postedBy?._id}`} >
              <img src={pinDetail?.postedBy?.image}  alt="user-profile" />
              <p >{pinDetail?.postedBy?.userName}</p>
            </Link>
            </div>
            

           
            <div className='pindetailcomment' >
            <h2 >Comments</h2>
              {pinDetail?.comments?.map((item) => (
                <div className='pindetailsincom' key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    alt="user-profile"
                  />
                  <div >
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='pindetailaddcom' >
            <Link  to={`/user-profile/${pinDetail?.postedBy?._id}`} >
            {console.log(pinDetail)}
            {console.log(pinDetail?.postedBy)}
            {console.log(pinDetail?.postedBy?._id)}
              <img src={pinDetail?.postedBy?.image}  alt="user-profile" />
            </Link>
              <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                onClick={addComment}
              >
                {addingComment ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      
      {pins?.length > 0 && (
        <h2 className='ininin' >
          More like this
        </h2>
      )}
      {pins ? (
        <div className='pundetailmore'>
        <MasonryLayout pins={pins} />
        </div>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;