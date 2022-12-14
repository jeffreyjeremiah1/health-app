import {React, useContext} from "react";
import { Nav, Bars, NavMenu, NavLink, NavBtn, NavBtnLink } from './NavbarElements';
import { appContext } from "../../App";
// import { FaCaretDown } from 'react-icons/fa';
import { Dropdown } from "./dropdown";

const Navbar = () => {

    const {user, setUser} = useContext(appContext);

    return (
       <>
        <Nav>
            <NavLink to="/">
                <img className='App-logo'src={require('../../img/Health1.png')} alt="" />
            </NavLink>
            <Bars/>
            <NavMenu>
                <NavLink to="/about" activestyle={{ color:'black' }}>
                    About
                </NavLink>
                <NavLink to="/services" activestyle={{ color:'black' }}>
                    Services
                </NavLink>
                <NavLink to="/bmi" activestyle={{ color:'black' }}>
                    bmi
                </NavLink>
                <NavLink to="/sign-up" activestyle={{ color:'black' }}>
                    Sign Up
                </NavLink>
            </NavMenu>
        
            {
                user.auth ? 
                <Dropdown /> : 
                <NavBtn>
                 <NavBtnLink to='/login'>Sign In</NavBtnLink>
                </NavBtn>
            }
        </Nav>
       </>   
    )
}

export default Navbar;