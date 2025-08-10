import { Outlet } from "react-router";
import bgImg from '../assets/hero.png'
import Header from "./Header";
import { LoggedOutHeaderLinks } from '../data/headerLinks';
import ToastBoard from "./ToastBoard";

export default function AuthLayout() {
    return <>
        <div>
            <Header linksArr={LoggedOutHeaderLinks}/>
            <main className="w-full min-h-[100vh] flex items-center justify-center py-10 bg-center bg-cover"
                style={{ backgroundImage: `url(${bgImg})` }}
            >
                <Outlet />
                <ToastBoard />
            </main>
        </div>
    </>
};
