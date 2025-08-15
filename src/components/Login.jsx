import { useState } from "react"
import { Link, useNavigate } from "react-router";
import { login } from "../utils/apiCalls";
import toast from "../utils/toast";

import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

export default function Login() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        userName: 'testUser001',
        password: 'Hello1!.',
        remember: false
    });
    const [isEyeOpen, setIsEyeOpen] = useState(false);

    return <form className="text-white flex flex-col gap-2 p-4 sm:p-10 min-w-[80vw] sm:min-w-[500px] rounded-xl shadow-xl/40
        backdrop-blur-sm border-1 border-white"
    >
        <h2 className="text-3xl mb-10 font-bold text-white">Login</h2>
        <div className="flex justify-between gap-2">
            <label htmlFor="username"
                className="text-gray-300"
            >
                Username
            </label>
            <input
                type="text"
                id='username'
                className="outline-1 outline-white font-semibold px-2 py-1  sm:w-auto rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                value={formState.userName}
                onChange={(event) => setFormState({ ...formState, userName: event.target.value })}
            />
        </div>
        <div className="relative flex justify-between gap-2">
            <label htmlFor="password"
                className="text-gray-300"
            >
                Password
            </label>
            <input
                type={isEyeOpen ? 'text' : 'password'}
                id='password'
                className="outline-1 outline-white font-semibold px-2 py-1 sm:w-auto rounded-sm focus:bg-cyan-600/50 focus:outline-2 transition-all duration-100"
                value={formState.password}
                onChange={(event) => setFormState({ ...formState, password: event.target.value })}
            />
            <button
                type='button'
                className="absolute right-2 text-md top-1"
                onClick={() => setIsEyeOpen(! isEyeOpen)}
            >
                {isEyeOpen ? <LuEye /> : <LuEyeClosed />}
            </button>
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

            <span>Remember me bro</span>
        </div>
        <div className="flex gap-2 self-center">
            <button
                type='submit'
                className=" w-20 outline-1 outline-white self-center px-2 py-1 mt-4 cursor-pointer bg-cyan-600 text-white hover:bg-cyan-700 font-semibold rounded-sm hover:outline-white hover:outline-2 focus:outline-2"
                onClick={async (e) => {
                    e.preventDefault();
                    try{
                        const res = await login(formState);
                        toast('ok', 'super', 'neutral');
                        navigate('/home');
                    } catch(e) {
                        toast(e.name, e.message, 'error');
                    }
                }}
            >
                Submit
            </button>
            <button
                type='button'
                className="w-20 outline-1 outline-white self-center px-2 py-1 mt-4 cursor-pointer text-white font-semibold rounded-sm hover:outline-2 focus:outline-2"
                onClick={() => {
                    setFormState({
                        userName: '',
                        password: '',
                        remember: false
                    });
                }}
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

    </form>
}
