import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'


export const Nav = styled.nav`
    background: #000;
    height: 100px;
    display: flex;
    position: absolute;
    top: 0;
    justify-content: space-between;
    ${'' /* padding: 0.5rem calc((100vw - 1000px) / 2); */}
    z-index: 100;

    @media screen and (max-width: 768px) {
        display: flex;
        justifyContent: space-between;
        width: 80vw;
    }
`;

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    font-size: 1.25rem;

    &.active {
        color: #15cdfc;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    width: auto;
    color: #fff;

    @media screen and (max-width: 768px) {
        display: block;
        position: fixed;
        justifyContent: space-between;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 2rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    ${'' /* margin-right: 24px; */}
    width: 60vw;
    white-space: nowrap;

    @media screen and (max-width: 768px) {
        display: none;
        width: auto;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-down: 24px;
    justify-content: flex-end;
    white-space: nowrap;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`;