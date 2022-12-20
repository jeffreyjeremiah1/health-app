import {React, useEffect, useState, useContext, useRef} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../index.css';
import {Wrapper, TextBoxLabel, Textbox, Card, CardTitle, Container, FormGroup, CoolButton} from '../components/LoginComponents/LoginElements';
import axios from 'axios';
import { appContext } from "../App";

const  EditProfile = () => {

    // Previous data of user
    const {user, setUser} = useContext(appContext);
    console.log(user);

    const [error, setError] = useState(false);
    const [imageToUpload, setImageToUpload] = useState(null);
    const [imageToShow, setImageToShow] = useState({image: null});
    const [ isUser, setIsUser ] = useState(false);

      // This keeps track of the user returned from the api call
      const [account, setAccount] = useState(user);

    const navigate = useNavigate();
    const id = user.user._id
    console.log(id);

    
    //helps with uploading images to the server
    function uploadImage(e){
        if (e.target.files.length !== 0){
            // console.log(e.target.files);
        setImageToUpload({image: URL.createObjectURL(e.target.files[0])});
        }
    };

    //this helps with picking the image
    const inputRef = useRef(null);

    function pickImage(e){
        console.log(e.target.files);
        if (e.target.files.length !== 0) {
            setImageToShow({image: URL.createObjectURL(e.target.files[0])});
        }
     };
 

  
    console.log(account);

    const handleSubmit = async (event) => {
        event.preventDefault();
        function changeDetails(){
            axios.patch(`http://localhost:4000/app/edit-profile/${id}`, account, {headers: { authorization: process.env.SECRET}})
            .then((response) => {
                console.log(response);
                setUser({ ...user, user: response.data.response })
                console.log(user);

            })
            .catch(function (error) {
                console.log(error.response);
            });
        }
        changeDetails();
        navigate('/profile')
    }

    function handleChange(e) {
        const {name, value} = e.target
        setAccount({ ...account, [name]: value});
    }


    return (
        <> 
            <section>
            <Card>
                <h3>Profile Settings Manager</h3>

                <div className='image-upload'>
                    {/* <FaUserCircle style={{fontSize: '120px', float: 'left'}}/> */}
                    <img className='profile-image' src={imageToShow.image ? imageToShow.image : require('./../img/default-profile-picture1.jpg')}/>
                    <input style={{display: 'none'}} ref={inputRef} accept="image/*" type="file" onChange={pickImage} value={account.img}/>
                    <CoolButton onClick={() => {inputRef.current.click()}} style={{width: '200px', top: '30%'}}>Edit Image</CoolButton>
                </div>

               <form onSubmit={handleSubmit} >
                <Container>
                    <FormGroup>
                    <Wrapper>
                        <Textbox type='text' placeholder={user.user.firstName} value={ account.firstName } name='firstName' onChange={handleChange}></Textbox>
                        <TextBoxLabel>First Name</TextBoxLabel>
                    </Wrapper>
                    </FormGroup>

                    <FormGroup>
                    <Wrapper>
                        <Textbox type='text' placeholder={user.user.lastName} value={ account.lastName } name='lastName' onChange={handleChange}></Textbox>
                        <TextBoxLabel>Last Name</TextBoxLabel>
                    </Wrapper>
                    </FormGroup>

                    <FormGroup>
                    <Wrapper>
                        <Textbox  type='text' placeholder={user.user.email} value={ account.email } name='email'  onChange={handleChange}/>
                        <TextBoxLabel>email</TextBoxLabel>
                    </Wrapper>
                    </FormGroup>
                            
                    <FormGroup>
                    <Wrapper>
                        <Textbox type='password' placeholder='*****' value={ account.password } name='password'  onChange={handleChange}/>
                        <TextBoxLabel>password</TextBoxLabel>
                    </Wrapper>
                    </FormGroup>
                            
                    <FormGroup>
                    <Wrapper>
                        <Textbox type='text' placeholder={user.user.location}  value={ account.location } name='location' onChange={handleChange}/>
                        <TextBoxLabel>location</TextBoxLabel>
                    </Wrapper>
                    </FormGroup>

                    <FormGroup>
                    <Wrapper>
                        <Textbox type='text' placeholder={user.user.twitter} value={ account.twitter } name='twitter' onChange={handleChange}/>
                        <TextBoxLabel>twitter</TextBoxLabel>
                    </Wrapper>
                    </FormGroup>

                    <FormGroup>
                    <Wrapper>      
                        <Textbox  type='text' placeholder={user.user.bio} value={ account.bio} name='bio' onChange={handleChange}/>
                        <TextBoxLabel>bio</TextBoxLabel>
                    </Wrapper>
                    </FormGroup>
                    
                    <FormGroup>
                    <Wrapper>      
                        <Textbox  type='text' placeholder={user.user.instagram} value={ account.instagram } name='instagram' onChange={handleChange}/>
                        <TextBoxLabel>instagram</TextBoxLabel>
                    </Wrapper>
                    </FormGroup>

                </Container>

                <CoolButton>Save</CoolButton>
                </form>
            </Card>
            </section>
        </>
    );
}

export default EditProfile;