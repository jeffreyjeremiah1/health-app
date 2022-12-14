import {React, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaLock } from 'react-icons/fa';
import {Wrapper, TextBoxLabel, Textbox, Icon, Card, CardTitle, FormGroup, CoolButton} from '../components/LoginComponents/LoginElements';
import axios from 'axios';
import { appContext } from "../App";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
}


const Login = () => {

    const navigate = useNavigate();

    // Checks if user wants to register or login
    const [register, setRegister] = useState(false);
    const [form, setForm] = useState(initialState);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {user, setUser} = useContext(appContext);

    /*Toggles between registeration and login */
    function toggleForm(){
        if (register){
            setRegister(false);
        }
        else{
            setRegister(true);
        }
    }

    const handleSubmit = async (event) => {
        console.log(form);
        event.preventDefault();

        // This handles registration
        if (register) {
            const { firstName, lastName, email, password, password2 } = form;
            if (password === password2) {
                await axios.post("http://localhost:4000/app/signup", {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    pic: " ",
                    location: " ",
                    bio: " ",
                    instagram: "",
                    twitter: ""
                })
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        setUser({auth: true, user: response.data.user});
                        navigate('/');
                    } else {
                        console.log('Registration not successful');
                        setUser({auth: false, user: {}})
                    }  
                })
                .catch(err => console.log(err));
            }
        } else {
            // This handles login
            const {email, password} = form;
            await axios.post("http://localhost:4000/app/login", {
                email: email,
                password: password
            })
            .then(response => {
                console.log(response.data);
                    if (response.data.success) {
                        setUser({auth: true, user: response.data.user});
                        navigate('/')
                    } else {
                        console.log('login unsccessful!');
                        setUser({auth: false, user: {}});
                    }  
            })
            .catch(function (err) {console.log(err)});
        }
    }

    function handleChange(event) {
        const {name, value} = event.target
        setForm(values => ({ ...values, [name]: value}))
    }

    return (
        <>
        <div>
            <section>
                <Card className="flip-card-front">
                    <CardTitle>Welcome</CardTitle> 
                    { register ? <CardTitle>Sign Up</CardTitle> : <CardTitle>Login</CardTitle>}
                    <form onSubmit={handleSubmit}>

                    {register && 
                        <FormGroup>
                        <Wrapper>
                            <Textbox  type='text' name='firstName' value={form.firstName} onChange={handleChange}/>
                            <TextBoxLabel>First Name</TextBoxLabel>
                            <Icon><FaUserCircle/></Icon>
                        </Wrapper>
                        </FormGroup>
                    }

                    {register && 
                        <FormGroup>
                        <Wrapper>
                            <Textbox  type='text' name='lastName' value={form.lastName} onChange={handleChange}/>
                            <TextBoxLabel>Last Name</TextBoxLabel>
                            <Icon><FaUserCircle/></Icon>
                        </Wrapper>
                        </FormGroup>
                    }

                        <FormGroup>
                        <Wrapper>
                            <Textbox  type='text' name='email' value={form.email} onChange={handleChange}/>
                            <TextBoxLabel>email</TextBoxLabel>
                            <Icon><FaUserCircle/></Icon>
                        </Wrapper>
                        </FormGroup>
                        
                        <FormGroup>
                        <Wrapper>
                            <Textbox type='password' name='password' value={form.password} onChange={handleChange}/>
                            <TextBoxLabel>password</TextBoxLabel>
                            <Icon><FaLock/></Icon>
                        </Wrapper>
                        </FormGroup>

                    { register && 
                        <FormGroup>
                        <Wrapper>
                            <Textbox type='password' name='password2' value={form.password2} onChange={handleChange}/>
                            <TextBoxLabel>Re-enter password</TextBoxLabel>
                            <Icon><FaLock/></Icon>
                        </Wrapper>
                        </FormGroup>
                    }
                    { register ? <CoolButton>Sign Up</CoolButton> : <CoolButton>Login</CoolButton>}
                    </form>  

                    <div className='form-action'>
                        <span>{ register ? 'Already Registered?' : 'Not Registered?' }</span>
                        <button style={{color: 'black'}} onClick={toggleForm} variant="link" type="submit">
                                { register ? 'Login' : 'Register' }
                        </button>
                    </div>
                </Card>
            </section>          
            </div>
        </>
    )
}

export default Login ;
