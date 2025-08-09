import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import Registration from './components/Registration'
import UserPage from './components/UserPage'
import PostPage from './components/PostPage'
import AddPost from './components/AddPost'
import SectionForm from './components/SectionForm'

function App() {

  return <>
      <div className='container mx-auto flex flex-col min-h-[100vh]'>
            <PostPage>
            </PostPage>
      </div>
    </>
}

export default App
