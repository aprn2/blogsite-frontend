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
import ToastBoard from './components/ToastBoard.jsx';
import { AppStateProvider } from './components/AppContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Home } from './components/Home.jsx';
import { HomeLayout } from './components/HomeLayout.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppStateProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/auth' element={<AuthLayout />} >
                            <Route index path='login' element={<Login />}>
                            </Route>
                            <Route path='register' element={<Registration />} >
                            </Route>
                        </Route>

                        <Route path='/home' element={<HomeLayout />} >
                            <Route index element={<Home />}>
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

                        {
                            // Not found Route
                        }
                        <Route path='*' element={<h1>Not found Bro</h1>} >
                        </Route>

                    </Routes>
                </BrowserRouter>
                <ToastBoard />
            </AppStateProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
)
