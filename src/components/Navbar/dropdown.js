import { useEffect, useState, useContext} from 'react'
import '../../index.css';
import { FaUserCircle, FaRegArrowAltCircleRight } from 'react-icons/fa'
import { appContext } from "../../App";
import { useNavigate } from 'react-router-dom';

const menu = [
    {
        name: "Profile",
        icon: <FaUserCircle/>,
        link: "/profile"
    },
    {
        name: "logout",
        icon: <FaRegArrowAltCircleRight/>,
        link: "/logout"
    }
]

const MenuButton = ({icon, name, link, goto}) => ( 

    <button onClick={() => {goto(link)}}>
        <span 
            className='material-symbols-outlined'
            >{icon}</span>
            <span>{name}</span>
    </button>
);

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user, setUser} = useContext(appContext);
    const navigate = useNavigate()

    const goto = (link) => {
        if (link === "/logout") {
            setUser({auth: false, user: {}})
            navigate(link)
        } else {
            navigate(link)
        }
        
    };

    const handleClick = (e) => {
        e.stopPropagation(); 
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        document.body.addEventListener("click",
        () => setIsOpen(false));
    });

    return (
        <div className='dropdown'>
            <div className={`menu ${isOpen ? "open" : " "}`}>
                {menu.map((item) => (
                    <MenuButton
                        key={item.name}
                        icon={item.icon}
                        name={item.name}
                        link={item.link}
                        goto={goto}
                    />
                ))}
            </div>
           
            <button onClick={handleClick}>
                <FaUserCircle/>{user.user.firstName} {user.user.lastName}<FaRegArrowAltCircleRight/> 
            </button>

        </div>
    );
};