import { Outlet } from "react-router";
import Header from "./Header";
import { userheaderLinks } from '../data/headerLinks';

export default function LoggedInLayout() {
    return <>
        <Header linksArr={userheaderLinks} />
        <Outlet />
    </>
};
