import { Outlet, useNavigate } from "react-router";
import Header from "./Header";
import { userHeaderLinks } from "../data/headerLinks";
import { useAppContext } from "./AppContext";
import { useEffect } from "react";

export default function PostLayout() {

    const appState = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(! appState.userId) {
            navigate('/')
        }
    });

    return <>
        <div
            className='text-indigo-200 bg-gray-900 flex flex-col bg-center bg-cover min-h-screen'
        >
            <Header linksArr={userHeaderLinks}/>
            <main
                className="flex-1 w-full flex flex-col items-center justify-center"
            >
                <Outlet />
            </main>
        </div>
    </>
};
