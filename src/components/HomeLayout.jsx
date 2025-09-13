import { Outlet } from 'react-router'
import { userHeaderLinks } from '../data/headerLinks'
import Header from './Header'

export const HomeLayout = () => {
  return ( <div
        className='text-indigo-200 bg-gray-900 flex flex-col bg-center bg-cover min-h-screen'
    >
        <Header linksArr={userHeaderLinks}/>
        <Outlet />
    </div>)
}

