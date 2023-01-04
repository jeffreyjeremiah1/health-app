import {React, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../index.css';
import {Wrapper, Card, CoolButton} from '../components/LoginComponents/LoginElements';
import { FaUserCircle, FaPen, FaMapMarkerAlt, FaInstagram, FaTwitter } from 'react-icons/fa'
import { appContext } from '../App.js'
import { Buffer } from 'buffer'


const Profile = () => {
    const {user, setUser} = useContext(appContext);
    const [imageToShow, setImageToShow] = useState();

    const [data, setData] = useState([user.user])
    console.log(user);
    const navigate = useNavigate();
    // const imageData = user.user.img.data.data.toString('base64')
    

    // setImageToShow(`data:image/png;base64,${imageData}`)

    // setImageToShow(require('./../img/default-profile-picture1.jpg'))

        
return (
    <>   
        <section>
            <Card>
                

                <img className='profile-image' src={`data:${user.user.img.contentType};base64,${Buffer.from(user.user.img.data.data).toString('base64')}`} alt='photo'/>

                            
                <h3>{user.user.firstName} {user.user.lastName}</h3>
                <CoolButton onClick={() => navigate('/edit-profile')}><FaPen/> Edit Profile</CoolButton>
                <p>{user.user.bio? user.user.bio : ''}</p>
                <h4><FaMapMarkerAlt/> {user.user.location}</h4>
            
                <a href={`https://www.instagram.com/${user.user.instagram? user.user.instagram: ""}/`} target="_blank" rel="noreferrer"> 
                    <FaInstagram/>
                </a>

                <a href={`https://www.twitter.com/${user.user.twitter? user.user.twitter: ''}/`} target="_blank" rel="noreferrer"> 
                    <FaTwitter/>
                </a>

            </Card>
        </section>
    </>
)
}
export default Profile;