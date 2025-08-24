import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import LoggedInLayout from './components/LoggedInLayout.jsx';
import PostPage from './components/PostPage.jsx';
import PostLayout from './components/PostLayout.jsx';
import AddPost from './components/AddPost.jsx';
import { AppStateProvider } from './components/AppContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppStateProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/auth' element={<AuthLayout />} >
                        <Route index path='login' element={<Login />}>
                        </Route>
                        <Route path='register' element={<Registration />} >
                        </Route>
                    </Route>

                    <Route path='/home' element={<LoggedInLayout />} >
                        <Route index element={<PostPage />}>
                        </Route>
                    </Route>

                    <Route path='/blogpost/:id' element={<PostLayout />} >
                        <Route index element={<PostPage />}>
                        </Route>
                    </Route>

                    <Route path='/addpost' element={<AddPost />} >
                    </Route>

                    <Route path='/user/:id' element={<LoggedInLayout />} >
                        <Route index element={<PostPage />}>
                        </Route>
                    </Route>

                    {// Not found Route
                    }
                    <Route path='*' element={<h1>Not found Bro</h1>} >
                    </Route>

                </Routes>
            </BrowserRouter>
        </AppStateProvider>
    </StrictMode>,
)
