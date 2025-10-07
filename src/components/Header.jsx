import { DiCodeigniter } from "react-icons/di";
import HeaderNav from './HeaderNav';
import HeaderProfile from './HeaderProfile';
import { useAppContext } from "./AppContext";

export default function Header() {

    const appState = useAppContext();

    return <header className='bg-white/8 shadow-md/20 w-full sticky top-0 z-20 backdrop-blur-sm'>
        <div
            className="container mx-auto flex px-3 justify-between sm:justify-between text-white h-14 items-center relative"
        >
            <div className='flex text-2xl sm:text-3xl gap-2 font-bold uppercase'>
                <DiCodeigniter className='hover:text-red-500' />
                heehe blogs
            </div>
            <div className="flex gap-10">
                <HeaderNav />
                {
                    appState.userId && <HeaderProfile />
                }
            </div>
        </div>
    </header>
}
