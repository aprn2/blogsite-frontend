import dayjs from 'dayjs';
import avatar from '../assets/woman.png'
import { useAppContext } from './AppContext'

export default function UserPage() {
    const appState = useAppContext();

    return <main className='container mx-auto px-3'>
        <h1 className='text-4xl font-bold text-center'>Account Details</h1>
        <div className="flex flex-col pt-5 gap-8 items-center text-white">
            <img src={avatar} alt="" className="w-40">
            </img>
            <div className='font-bold text-xl'>{appState.userName}</div>
            <div>{`Role : ${appState.isAdmin ? 'Admin' : 'Regular User'}`}</div>
            <div>{`Id : ${appState.userId}`}</div>
            <div>{`dob : ${dayjs(appState.dob).format('DD/MM/YYYY')}`}</div>
            <div>{`email : ${appState.email}`}</div>
        </div>
    </main>
}
