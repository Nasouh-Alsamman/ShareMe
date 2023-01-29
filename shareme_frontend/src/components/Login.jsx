import React from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import {GoogleLogin } from '@react-oauth/google'
import shareVideo from '../assets/share.mp4';
import logo from '../assets/clipart56690.png';
import { client } from '../client';
import jwt_decode from "jwt-decode";


const Login = () => {
    const navigate = useNavigate();
        const responseGoogle = async (response) => {
            const decoded = jwt_decode(response.credential)
            localStorage.setItem('user', JSON.stringify(decoded))
            const { name, picture, sub } = decoded;


            const doc = {

                _id: sub,
                _type: 'user',
                userName: name,
                image: picture,
            }
            client.createIfNotExists(doc)
                .then(() => {
                    navigate('/', { replace: true })
                }) 
            }
  return (
    <GoogleOAuthProvider
     clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>

    <div className="login">
        <div className='video'>
            <video src={shareVideo} type="video/mp4" loop controls={false} muted autoPlay />
        </div>
        <div className="item">
            <div className='logo'>
                <img src={logo} alt="" />
            </div>
            <div className="content">
            <GoogleLogin 
               
                
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy='single_host_origin'
                />
            </div>
        </div>
    </div>
    </GoogleOAuthProvider>
  )
}

export default Login
