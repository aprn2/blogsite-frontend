import { Outlet } from "react-router";
import bgImg from '../assets/hero.png'
import Header from "./Header";
import { LoggedOutHeaderLinks } from '../data/headerLinks';
import ToastBoard from "./ToastBoard";

export default function AuthLayout() {
    return <>
        <div
            className='flex flex-col bg-center bg-cover min-h-[100vh]'
            style={{ backgroundImage: `url(${bgImg})`}}
        >
            <Header linksArr={LoggedOutHeaderLinks}/>
            <main
                className="flex-1 w-full h-full flex flex-col items-center justify-center"
            >
                <Outlet />
            </main>
        </div>
    </>
};
