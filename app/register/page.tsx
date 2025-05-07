"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conformPassword, setConformPassword] = useState("")
    const [error, setError] = useState<string | null  >("")


    // use use the router for navagatin 
    const router = useRouter()
    // router.push("/login")

    // from handler 
    const handleFormSubmit =  async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(password !== conformPassword){
            setError("Confrom Password is not matched with the Password")
        }

        // handled the submit 
        try {
            const res = await fetch("/api/auth/register",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({email, password})
            })

            const data = res.json()
            if(!res.ok){
                setError("Registration Failed")
            }

            router.push("/login")
            
        } catch (error) {
            error
        }

    }
  return (
    <div>
            <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-black">Create an Account</h2>
            {error && (
                <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}
            <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-1 text-black bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-black">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-1 text-black bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="conformPassword" className="block text-sm font-medium text-black">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="conformPassword"
                        value={conformPassword}
                        onChange={(e) => setConformPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-1 text-black bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    Register
                </button>
            </form>
            <p className="text-sm text-center text-black">
                Already have an account?{" "}
                <span
                    onClick={() => router.push("/login")}
                    className="font-medium text-blue-600 cursor-pointer hover:underline"
                >
                    Login
                </span>
            </p>
        </div>
    </div>
    </div>
  )
}
