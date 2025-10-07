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
import ToastBoard from './components/ToastBoard.jsx';
import { AppStateProvider } from './components/AppContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './components/Home.jsx';
import { HomeLayout } from './components/HomeLayout.jsx';
import { AdminLayout } from './components/AdminLayout.jsx';
import { AddPost } from './components/AddPost.jsx';
import { EditPost } from './components/EditPost.jsx';
import UserPage from './components/UserPage.jsx';
import { Liked } from './components/Liked.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppStateProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<AuthLayout />} >
                            <Route index element={<Login />} />
                            <Route path='login' element={<Login />} />
                            <Route path='register' element={<Registration />} />
                        </Route>

                        <Route path='/home' element={<HomeLayout />} >
                            <Route index element={<Home />} />
                        </Route>

                        <Route path='/liked' element={<HomeLayout />} >
                            <Route index element={<Liked />} />
                        </Route>

                        <Route path='/me' element={<LoggedInLayout />} >
                            <Route index element={<UserPage/>} />
                        </Route>

                        <Route path='/blogpost/:id' element={<PostLayout />} >
                            <Route index element={<PostPage />} />
                        </Route>

                        <Route path='/addpost' element={<AddPost />} />

                        {
                        //<Route path='/user/:id' element={<LoggedInLayout />} >
                        //    <Route index element={<PostPage />} />
                        //</Route>
                        }

                        {
                        // Admin only Route
                        }
                        <Route path='/admin' element={<AdminLayout />} >
                            <Route index element={<EditPost />} />
                            <Route path='add-post' element={<AddPost />} />
                            <Route path='edit-post/:id' element={<EditPost key='edit' />} />
                        </Route>
                        {
                        // All Non Exsisting Routes
                        }
                        <Route path='*' element={<h1>Not found Bro</h1>} />

                    </Routes>
                </BrowserRouter>
                <ToastBoard />
            </AppStateProvider>
        </QueryClientProvider>
    </StrictMode>,
)
