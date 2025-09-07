import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

import { useAppContext } from "./AppContext"
import { NavLink } from 'react-router';
import { LoggedOutHeaderLinks, userHeaderLinks } from '../data/headerLinks';
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function HeaderNav() {
    const appState = useAppContext();

    const [open, setOpen] = useState(false);

    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    let links;
    if(!appState.userId) {
        links = LoggedOutHeaderLinks;
    }else if(! appState.isAdmin) {
        links = userHeaderLinks;
    }

    return <nav className=''>
        <ul className='text-lg sm:text-xl flex justify-around gap-3 min-w-40'>
            {isDesktop ? links.map((link) =>
                <li key={link.text} >
                    <NavLink
                        to={link.link}
                        className={({isActive}) => `${isActive ? 'text-cyan-800' : ''} hover:underline hover:text-blue-600 transition-colors duration-200`}
                    >
                        {link.text}
                    </NavLink>
                </li>
            ) :
                <button onClick={() => setOpen(!open)}>
                    {open
                        ? <IoCloseSharp className='text-2xl sm:text-3xl hover:text-red-500' />
                        : <GiHamburgerMenu className='text-2xl sm:text-3xl hover:text-red-500' />
                    }
                </button>
            }
        </ul>
    </nav>
}
