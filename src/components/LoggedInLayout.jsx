import { Outlet, useNavigate } from "react-router";
import Header from "./Header";
import { userHeaderLinks } from '../data/headerLinks';
import { useEffect } from "react";
import { useAppContext } from "./AppContext";

export default function LoggedInLayout() {

    const appState = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(! appState.userId) {
            navigate('/')
        }
    });

    return <div
        className='text-indigo-200 bg-gray-900 flex flex-col bg-center bg-cover min-h-screen'
    >
        <Header linksArr={userHeaderLinks} />
        <Outlet />
    </div>
};
