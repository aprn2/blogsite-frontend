import { useState } from "react"
import { Link, useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import { createUserValidator } from "../utils/validators";
import { signUp } from "../utils/apiCalls";
import toast from "../utils/toast";
import { DiVim } from "react-icons/di";
import { dimensionValueTypes } from "framer-motion";

export default function Registration() {

    const navigate = useNavigate();
    const [pageNo, setPageNo] = useState(0);

    const Page0 = () => <>
        <div className="flex justify-between gap-2">
            <label htmlFor="name"
                className="text-gray-300"
            >
                Name
            </label>
            <div
                className="flex flex-col w-3/5"
            >
                <Field
                    type="text"
                    name='name'
                    id='name'
                    className="outline-1 outline-white font-semibold px-2 py-1 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                />
                <FormErrorMessage name='name' />
            </div>
        </div>
        <div className="flex justify-between gap-2">
            <label htmlFor="email"
                className="text-gray-300"
            >
                Email
            </label>
            <div
                className="flex flex-col w-3/5"
            >
                <Field
                    name='email'
                    type="text"
                    id='email'
                    className="outline-1 outline-white font-semibold px-2 py-1 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                />
                <FormErrorMessage name='email' />
            </div>
        </div>
        <div className="flex justify-between gap-2">
            <label htmlFor="dob"
                className="text-gray-300"
            >
                Date of birth
            </label>
            <div
                className="flex flex-col w-3/5"
            >
                <Field type="date"
                    name='dob'
                    className="outline-1 outline-white hover:outline-2 focus:outline-2 rounded-sm px-2 py-1"
                />
                <FormErrorMessage name='dob' />
            </div>
        </div>
    </>

    const Page1 = () => <>
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
                    className="outline-1 outline-white font-semibold px-2 py-1 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                    autocomplete='new-user'
                />
                <FormErrorMessage name='userName' />
            </div>
        </div>
        <div className="flex justify-between gap-2">
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
                    type="password"
                    id='password'
                    className="outline-1 outline-white font-semibold px-2 py-1 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                    autocomplete='new-password'
                />
                <FormErrorMessage name='password' />
            </div>
        </div>
        <div className="flex justify-between gap-2">
            <label htmlFor="confirmpassword"
                className="text-gray-300"
            >
                Confirm Password
            </label>
            <div
                className="flex flex-col w-3/5"
            >
                <Field
                    name='confirmPassword'
                    type="confirmPassword"
                    id='confirmPassword'
                    className="outline-1 outline-white font-semibold px-2 py-1 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                    autocomplete='new-password'
                />
                <FormErrorMessage name='confirmPassword' />
            </div>
        </div>
        <div className="text-gray-300 flex flex-col items-center gap-1 self-start mt-6">
            <div
                className="flex gap-2"
            >
                <Field
                    name='agree'
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border outline-white rounded-md checked:bg-cyan-600 transition-all duration-100 focus:outline-2"
                />
                <span>Accept terms and conditions</span>
            </div>
            <FormErrorMessage name='agree' />
        </div>
    </>

    return <Formik
        initialValues={{
            name: '',
            dob: new Date(),
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
            agree: false
        }}
        validationSchema={createUserValidator}
        onSubmit={async(value, action) => {
            const userDate = {...value};
            delete userDate.agree;
            delete userDate.confirmPassword;
            try{
                const res = await signUp(userDate);
                toast({title: 'sucksucks', description: 'user created', type: 'neutral'});
                navigate('/auth/login');
            }catch(e) {
                toast({title: e.name, description: e.message, type: 'error'});
            }
        }}
    > 
        {({isSubmitting, resetForm, errors}) =>
            <Form className="text-white flex flex-col gap-2 p-4 sm:p-10 min-w-[90vw] sm:min-w-[500px] rounded-xl shadow-xl/40
                backdrop-blur-sm border-1 border-white"
                autoComplete="on"
            >
                <h2 className="text-3xl mb-10 font-bold text-white">Registration</h2>
                {pageNo === 0 ? <Page0 /> : <Page1 />}

                <div className="flex gap-1 self-center text-gray-300 text-sm sm:text-md text-nowrap mt-6">
                    Already have an account?
                    <Link to="../login" className="text-white font-bold hover:underline">
                        Sign In Instead
                    </Link>
                </div>
                <div className="flex gap-2 justify-center px-10">
                    <button
                        type='button'
                        onClick={() => setPageNo(pageNo === 0 ? 1 : 0)}
                        className="flex-1 outline-1 outline-white self-center px-2 py-1 mt-4 cursor-pointer text-white font-semibold rounded-sm hover:outline-2 focus:outline-2"
                    >
                        {pageNo === 0 ? 'Next' : 'Back'}
                    </button>
                    <button
                        className="flex-1 outline-1 outline-white self-center px-2 py-1 mt-4 cursor-pointer text-white font-semibold rounded-sm hover:outline-2 focus:outline-2"
                        type="button"
                        onClick={() => {
                            resetForm();
                            setPageNo(0);
                        }}
                    >
                        Reset
                    </button>
                    <button
                        className="text-nowrap flex-1 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-800 outline-1 outline-white self-center px-2 py-1 mt-4 cursor-pointer bg-cyan-600 text-white hover:bg-cyan-700 font-semibold rounded-sm hover:outline-white hover:outline-2 focus:outline-2"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Sign Up
                    </button>
                </div>

            </Form>
        }
    </Formik>
}
