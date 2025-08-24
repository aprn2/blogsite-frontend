import { Outlet } from "react-router";
import Header from "./Header";
import { userHeaderLinks } from '../data/headerLinks';
import ToastBoard from "./ToastBoard";

export default function PostLayout() {
    return <>
        <div
            className='text-indigo-200 bg-gray-900 flex flex-col bg-center bg-cover min-h-screen'
        >
            <Header linksArr={userHeaderLinks}/>
            <main
                className="flex-1 w-full flex flex-col items-center justify-center"
            >
                <Outlet />
                <ToastBoard />
            </main>
        </div>
    </>
};
