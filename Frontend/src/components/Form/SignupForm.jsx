import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navigate, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { singUP_Schema } from './SignUP_Schema'
import axios from 'axios'
const SignupForm = () => {
    const API = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {

            console.log(data)

            const res = await axios.post(`${API}/signup`, data,)
            // Example API Call
            // const res = await fetch('YOUR_API', {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(data)
            // })

            toast.success('Account Created Successfully!', {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            })

            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(singUP_Schema)
    })

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            {/* Container */}
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10 border border-gray-100">

                {/* Header */}
                <div className="mb-10 text-left">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Create Account
                    </h2>

                    <p className="text-gray-500 mt-2 text-base">
                        Signup to continue your journey.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            {...register('username')}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
                        />

                        {errors.username && (
                            <p className="text-red-600 mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            placeholder="example@gmail.com"
                            {...register('email')}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
                        />

                        {errors.email && (
                            <p className="text-red-600 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            {...register('password')}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all"
                        />

                        {errors.password && (
                            <p className="text-red-600 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white bg-[#FF5A5F] hover:bg-[#E31C5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] transition-all transform active:scale-95"
                        >
                            Sign Up
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SignupForm