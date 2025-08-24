import { Outlet } from "react-router";
import Header from "./Header";
import { userHeaderLinks } from '../data/headerLinks';

export default function LoggedInLayout() {
    return <div
        className='text-indigo-200 bg-gray-900 flex flex-col bg-center bg-cover min-h-screen'
    >
        <Header linksArr={userHeaderLinks} />
        <Outlet />
    </div>
};
