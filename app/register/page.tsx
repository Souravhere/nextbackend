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
      
    </div>
  )
}

export default Register
