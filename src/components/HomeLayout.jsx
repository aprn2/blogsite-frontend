import { Outlet, useNavigate } from 'react-router'
import { userHeaderLinks } from '../data/headerLinks'
import Header from './Header'
import { useAppContext } from './AppContext'
import { useEffect } from 'react'

export const HomeLayout = () => {
    const appState = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(! appState.userId) {
            navigate('/')
        }
    });

    return ( <div
        className='text-indigo-200 bg-gray-900 flex flex-col bg-center bg-cover min-h-screen'
    >
        <Header linksArr={userHeaderLinks}/>
        <Outlet />
    </div>)
}
