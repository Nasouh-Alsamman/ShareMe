import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import { categories } from '../utils/data';
import { client } from '../client';
import Spinner from './Spinner';

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate('/');
        window.location.reload();
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };
  return (
    <div className='creatpin' >
     
      <div className='creatpinin' >
        <div  >
          <div >
            {loading && (
              <Spinner />
            )}
            {
              wrongImageType && (
                <p className='creatpinpleas'>It is a wrong file type.</p>
              )
            }
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className='creatpinbefore' >
                  <div className='creatpinbeforein'>
                    <p className='AiOutlineCloudUpload'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='creatpinbeforeinppp'>Click to upload</p>
                  </div>

                  <p className='recomended' > Use high-quality JPG, JPEG, SVG, PNG, GIF less than 20MB </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className='creatpininput'
                  
                />
              </label>
            ) : (
              <div className='creatpinafter'>
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                 className='creatpinafterimg'
                />
                <button
                  type="button"
                  onClick={() => setImageAsset(null)}
                  className="creatpinafterbtn"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
    
        <div className='creatpinform' >
             
        {fields && (
        <p className='creatpinpleas' >Please add all fields.</p>
      )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className='creatpindowninput'
          />
          
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className='creatpindowninput'
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className='creatpindowninput'
          />

          <div className='creatpinchoos' >
            <div className='creatpinchoos'>
              <p >Choose Pin Category</p>
              <select
                onChange={(e) => {setCategory(e.target.value)}}
                className="creatpindowninput"
              >
                <option className='creatpinoption' value="others" >Select Category</option>
                {categories.map((item) => (
                  <option className='creatpinoption'  value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div >
              <button
                type="button"
                onClick={savePin}
                className="creatpinbtn"
              >
                Save Pin
              </button>
             
            </div>
           
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CreatePin;