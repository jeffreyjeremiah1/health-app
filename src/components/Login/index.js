import {React, useState} from "react";
import { FaUserCircle, FaLock } from 'react-icons/fa';
import {Wrapper, TextBoxLabel, Textbox, Icon, Card, CardTitle, FormGroup, CoolButton} from './LoginElements';

const initialState = {
    username: '',
    password: ''
}

const Login = () => {

    const [state, setState] = useState(initialState);

    const handleSubmit = async (event) => {
        console.log(state);
        event.preventDefault();
    }

    function handleChange(event) {
        const {name, value} = event.target
        setState(values => ({ ...values, [name]: value}))
    }

    return (
        <>
            <Card>
                <CardTitle>Login</CardTitle> 
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                    <Wrapper>
                        <Textbox  type='text' name='username' value={state.username} onChange={handleChange}/>
                        <TextBoxLabel>username</TextBoxLabel>
                        <Icon><FaUserCircle/></Icon>
                    </Wrapper>
                    </FormGroup>
                    <FormGroup>
                    <Wrapper>
                        <Textbox type='password' name='password' value={state.password} onChange={handleChange}/>
                        <TextBoxLabel>password</TextBoxLabel>
                        <Icon><FaLock/></Icon>
                    </Wrapper>
                    
                    </FormGroup>
                   
                   <CoolButton>Login</CoolButton>
                </form>
                
            </Card>
        </>
    )
}

export default Login;