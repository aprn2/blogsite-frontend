import { useState } from "react"
import { Formik, Form, Field } from "formik";
import { loginDataValidator } from "../utils/validators";
import { Link, useNavigate } from "react-router";
import { login } from "../utils/apiCalls";
import toast from "../utils/toast";
import { useAppContext } from "./AppContext";

import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import FormErrorMessage from "./FormErrorMessage";

export default function Login() {

    const navigate = useNavigate();
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const appState = useAppContext();

    return <Formik
        initialValues={{
            userName: '',
            password: '',
            remember: false
        }}
        validationSchema={loginDataValidator}
        onSubmit={async (value, action) => {
            try{
                const res = await login(value);
                appState.setIsAdmin(res.admin);
                appState.setToken(res.token);
                appState.setUserId(res.id);
                appState.setUserName(res.userName);
                navigate('/home');
            } catch(e) {
                toast({title: e.name, description: e.message, type: 'error'});
            }
        }
        }
    > 
        {({isSubmitting, setFieldValue, resetForm}) => (
            <Form className="text-white flex flex-col gap-2 p-4 sm:p-10 min-w-[80vw] sm:min-w-[500px] rounded-xl shadow-xl/40
                backdrop-blur-sm border-1 border-white"
                autoComplete="on"
            >
                <h2 className="text-3xl mb-10 font-bold text-white">Login</h2>
                <div className="flex justify-between gap-2">
                    <label htmlFor="username"
                        className="text-gray-300"
                    >
                        Username
                    </label>
                    <div
                        className="flex flex-col w-3/5"
                    >
                        <Field
                            name='userName'
                            type="text"
                            id='username'
                            className="outline-1 outline-white font-semibold px-2 py-1 sm:w-auto rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                            autocomplete='username'
                        />
                        <FormErrorMessage name='userName' />
                    </div>
                </div>
                <div className="relative flex justify-between gap-2">
                    <label htmlFor="password"
                        className="text-gray-300"
                    >
                        Password
                    </label>
                    <div
                        className="flex flex-col w-3/5"
                    >
                        <Field
                            name='password'
                            type={isEyeOpen ? 'text' : 'password'}
                            id='password'
                            className="outline-1 outline-white font-semibold px-2 py-1 sm:w-auto rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                            autocomplete='current-password'
                        />
                        <button
                            type='button'
                            className="absolute right-2 text-md top-1"
                            onClick={() => setIsEyeOpen(! isEyeOpen)}
                        >
                            {isEyeOpen ? <LuEye /> : <LuEyeClosed />}
                        </button>
                        <FormErrorMessage name='password' />
                    </div>
                </div>
                <div className="text-gray-300 flex items-center gap-1 self-start mt-6">
                    <Field
                        name='remember'
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border outline-white rounded-md checked:bg-cyan-600 transition-all duration-100 focus:outline-2"
                    />

                    <span>Remember me bro</span>
                </div>
                <div className="flex gap-2 self-center">
                    <button
                        disabled={isSubmitting}
                        type='submit'
                        className="text-nowrap flex-1 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-800 outline-1 outline-white self-center px-2 py-1 mt-4 cursor-pointer bg-cyan-600 text-white hover:bg-cyan-700 font-semibold rounded-sm hover:outline-white hover:outline-2 focus:outline-2"
                    >
                        {isSubmitting ? 'Logging in': 'Login'}
                    </button>
                    <button
                        type='button'
                        className="flex-1 outline-1 outline-white self-center px-2 py-1 mt-4 cursor-pointer text-white font-semibold rounded-sm hover:outline-2 focus:outline-2"
                        onClick={resetForm}
                    >
                        Reset
                    </button>
                </div>
                <div className="text-sm sm:text-md flex gap-1 self-center mt-6 text-gray-300">
                    <span>Forget Password?</span>
                    <Link to="" className="text-white font-bold hover:underline">Reset</Link>
                </div>
                <div className="text-sm sm:text-md flex gap-1 self-center text-gray-300 text-nowrap">
                    Dont have an account?
                    <Link to="../register" className="text-white font-bold hover:underline text-nowrap">
                        Create account
                    </Link>
                </div>

            </Form>
        )}
    </Formik>
}
