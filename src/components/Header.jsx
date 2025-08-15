import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { GiHamburgerMenu } from "react-icons/gi";
import { DiCodeigniter } from "react-icons/di";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink } from 'react-router';

export default function Header({linksArr}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const links = linksArr.map((headerLink) =>
        <li key={headerLink.text}>
            <NavLink
                to={headerLink.link}
                className={({isActive}) => `${isActive ? 'text-cyan-800' : ''} text-lg sm:text-xl hover:underline hover:text-blue-600 transition-colors duration-200`}
            >
                {headerLink.text}
            </NavLink>
        </li>
    )
    return <header className='w-full sticky top-0 z-20 backdrop-blur-md'>
        <div
            className=" container mx-auto flex px-3 justify-between sm:justify-between text-white h-14 items-center relative"
        >
            <div className='flex text-2xl sm:text-3xl gap-2 font-bold uppercase'>
                <DiCodeigniter className='hover:text-red-500' />
                waste blogs
            </div>
            {isDesktop ?
                <nav className=''>
                    <ul className='flex justify-around gap-3 min-w-40'>
                        {links}
                    </ul>
                </nav>
                : <button onClick={() => setDrawerOpen(!drawerOpen)}>
                    {drawerOpen
                        ? <IoCloseSharp className='text-2xl sm:text-3xl hover:text-red-500' />
                        : <GiHamburgerMenu className='text-2xl sm:text-3xl hover:text-red-500' />
                    }
                </button>
            }
        </div>
        {!isDesktop && drawerOpen &&
            <nav className='bg-blue-200 py-2'>
                <ul className='w-full flex flex-col justify-around gap-2'>
                    { linksArr.map((headerLink) =>
                        <>
                            <hr />
                            <li
                                key={headerLink.text}
                                className='text-center w-full'
                            >
                                <NavLink
                                    to={headerLink.link}
                                    className='text-lg sm:text-xl hover:underline hover:text-blue-100 transition-colors duration-200'
                                >
                                    {headerLink.text}
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        }
    </header>
}
