import React from "react";
import { Nav, Bars, NavMenu, NavLink, NavBtn, NavBtnLink } from './NavbarElements';


const Navbar = () => {
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
            <NavBtn>
                <NavBtnLink to='/signin'>Sign In</NavBtnLink>
            </NavBtn>
        </Nav>
       </>   
    
    )
}

export default Navbar;

