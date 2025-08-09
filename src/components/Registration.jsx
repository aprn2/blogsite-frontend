import { useState } from "react"
import bgImg from '../assets/hero.png'
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router";

export default function Registration() {

    const [pageNo, setPageNo] = useState(0);

    const [formState, setFormState] = useState({
        firstName: '',
        secondName: '',
        dob: '',
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        agree: false
    });

    const reset = (event) => {
        console.log('dfj');
        event.preventDefault();
        setFormState({
            firstName: '',
            secondName: '',
            dob: '',
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
            agree: false
        });
    }

    const page = pageNo == 0 ?
        <>
            <div className="flex justify-between gap-2">
                <label htmlFor="firstname"
                    className="text-gray-300"
                >
                    Firstname
                </label>
                <input
                    type="text"
                    id='firstname'
                    className="outline-1 outline-white font-semibold px-2 py-1 w-3/5 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                    value={formState.firstName}
                    onChange={(event) => setFormState({ ...formState, firstName: event.target.value })}
                />
            </div>
            <div className="flex justify-between gap-2">
                <label htmlFor="lastname"
                    className="text-gray-300"
                >
                    Lastname
                </label>
                <input
                    type="text"
                    id='lastname'
                    className="outline-1 outline-white font-semibold px-2 py-1 w-3/5 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                    value={formState.lastName}
                    onChange={(event) => setFormState({ ...formState, lastName: event.target.value })}
                />
            </div>
            <div className="flex justify-between gap-2">
                <label htmlFor="email"
                    className="text-gray-300"
                >
                    Email
                </label>
                <input
                    type="text"
                    id='email'
                    className="outline-1 outline-white font-semibold px-2 py-1 w-3/5 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                    value={formState.email}
                    onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                />
            </div>
            <div className="flex justify-between gap-2">
                <label htmlFor="dob"
                    className="text-gray-300"
                >
                    Date of birth
                </label>
                <input type="date"
                    className="outline-1 outline-white hover:outline-2 focus:outline-2 rounded-sm w-3/5 px-2 py-1"
                />
            </div>

            <div className="flex gap-2 justify-center">
                <button
                    type='button'
                    onClick={() => setPageNo(1)}
                    className=" w-20 outline-1 outline-white self-center px-2 py-1 mt-4 cursor-pointer bg-cyan-600 text-white hover:bg-cyan-700 font-semibold rounded-sm hover:outline-white hover:outline-2 focus:outline-2"
                >
                    Next
                </button>
                <button
                    className="w-20 outline-1 outline-white self-center px-2 py-1 mt-4 cursor-pointer text-white font-semibold rounded-sm hover:outline-2 focus:outline-2"
                    onClick={reset}
                    type="button"
                >
                    Reset
                </button>
            </div>

            <div className="flex gap-1 self-center text-gray-300 text-sm sm:text-md text-nowrap mt-6">
                Already have an account?
                <Link to="../login" className="text-white font-bold hover:underline">
                    Sign In Instead
                </Link>
            </div>

        </> : <>
            <div>

            </div>
            <button
                type='button'
                className="self-start px-2 py-1 rounded-sm text-lg flex justify-start gap-2 items-center text-gray-200 outline-1 outline-white focus:outline-2 hover:outline-2"
                onClick={() => setPageNo(0)}
            >
                <IoArrowBackSharp />
                Back
            </button>
            <div className="flex justify-between gap-2">
                <label htmlFor="username"
                    className="text-gray-300"
                >
                    Username
                </label>
                <input
                    type="text"
                    id='username'
                    className="outline-1 outline-white font-semibold px-2 py-1 w-3/5 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                    value={formState.userName}
                    onChange={(event) => setFormState({ ...formState, userName: event.target.value })}
                />
            </div>
            <div className="flex justify-between gap-2">
                <label htmlFor="password"
                    className="text-gray-300"
                >
                    Password
                </label>
                <input
                    type="password"
                    id='password'
                    className="outline-1 outline-white font-semibold px-2 py-1 w-3/5 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                    value={formState.password}
                    onChange={(event) => setFormState({ ...formState, password: event.target.value })}
                />
            </div>
            <div className="flex justify-between gap-2">
                <label htmlFor="confirmpassword"
                    className="text-gray-300"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    id='confirmpassword'
                    className="outline-1 outline-white font-semibold px-2 py-1 w-3/5 rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                    value={formState.confirmPassword}
                    onChange={(event) => setFormState({ ...formState, confirmPassword: event.target.value })}
                />
            </div>
            <div className="text-gray-300 flex items-center gap-1 self-start mt-6">
                <input
                    type="checkbox"
                    checked={formState.remember}
                    onChange={(event) =>
                        setFormState({ ...formState, remember: event.target.checked })
                    }
                    className="peer appearance-none w-5 h-5 border outline-white rounded-md checked:bg-cyan-600 transition-all duration-100 focus:outline-2"
                />

                <span>Accept terms and conditions</span>
            </div>
        </>

    return <form className="text-white flex flex-col gap-2 p-4 sm:p-10 min-w-[90vw] sm:min-w-[500px] rounded-xl shadow-xl/40
                        backdrop-blur-sm border-1 border-white"
        >
            <h2 className="text-3xl mb-10 font-bold text-white">Registration</h2>
            {page}
        </form>
}
