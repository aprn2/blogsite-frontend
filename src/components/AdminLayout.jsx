import { Outlet } from 'react-router'
import Header from './Header'
import { useAppContext } from "./AppContext";
import { useNavigate } from "react-router";
import { useEffect } from 'react';

export const AdminLayout = () => {

    const navigate = useNavigate();

    const appState = useAppContext();

    useEffect(() => {
        if(! appState.isAdmin) {
            navigate('/');
        }
    }, []);

    return ( <div
        className='text-indigo-200 bg-gray-900 flex flex-col bg-center bg-cover min-h-screen'
    >
        <Header />
        <Outlet />
    </div>)
}
