import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Layout from './../../layout/Layout.jsx';
import { userLoginAction } from './../../../redux/actions/User.js';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userLoginReducer = useSelector((state) => state.userLoginReducer);
    
    const { loading, error } = userLoginReducer;
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLoginAction(email, password))
    };

    return (
        <Layout>
            {loading ? <h1>Loading</h1>
            : error ? <h1>{error}</h1>
            : <>
            {/*
                This example requires updating your template:

                ```
                <html className="h-full bg-white">
                <body className="h-full">
                ```
            */}
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className='text-4xl font-extrabold text-center bg-gradient-to-r from-red-950 via-red-500 to-red-300 bg-clip-text text-transparent mb-1 leading-tight'>
                        Login
                    </h1>
                </div>

                <div className="mt-3 w-xs sm:w-md">
                    <form action="#" method="POST" className="space-y-1" onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="cursor-pointer flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </>}
        </Layout>
    )
}

export default Login
