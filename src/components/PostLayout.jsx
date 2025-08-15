import { Outlet } from "react-router";
import Header from "./Header";
import { userheaderLinks } from '../data/headerLinks';
import ToastBoard from "./ToastBoard";

export default function PostLayout() {
    return <>
        <div
            className='text-indigo-200 bg-gray-900 flex flex-col bg-center bg-cover h-screen overflow-hidden'
        >
            <Header linksArr={userheaderLinks}/>
            <main
                className="flex-1 w-full flex flex-col items-center justify-center"
            >
                <Outlet />
                <ToastBoard />
            </main>
        </div>
    </>
};
