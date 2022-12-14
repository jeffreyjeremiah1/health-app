import {React, useEffect, useState, useContext} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../index.css';
import {Wrapper, TextBoxLabel, Textbox, Card, CardTitle, Container, FormGroup, CoolButton} from '../components/LoginComponents/LoginElements';
import { FaUserCircle, FaPen, FaMapMarkerAlt, FaInstagram, FaTwitter } from 'react-icons/fa'
import axios from 'axios';
import { appContext } from "../App";

const  EditProfile = () => {

    // Previous data of user
    const {user, setUser} = useContext(appContext);
    console.log(user);

    const [error, setError] = useState(false);

    const photoUpload = e =>{
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.results
          });
        }
        reader.readAsDataURL(file);
      }

    // keeps track of if the current info page belongs to the logged in user
    const [ isUser, setIsUser ] = useState(false);

    const navigate = useNavigate();

    const id = user.user._id
    console.log(id);
    
    // This keeps track of the user returned from the api call
    const [account, setAccount] = useState(user);
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
                <h2>Profile Settings Manager</h2>

               <form onSubmit={handleSubmit} >

                <Container>

                    <Container className='image-upload'>
                        <TextBoxLabel for='photo-upload'>
                                <FaUserCircle style={{fontSize: '120px'}}/>
                        </TextBoxLabel>
                        <input id="photo-upload" type="file" onChange={photoUpload} />
                    </Container>
                   

                    <CoolButton>Change Image</CoolButton>
                </Container>

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