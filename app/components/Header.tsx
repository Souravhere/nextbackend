"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

function Header() {

    const {data:session} = useSession();

    const handleSignout  = async ()=> {
        try {
            await signOut()
        } catch (error) {
            error
        }
    }

  return (
    <div> 
        <button onClick={handleSignout}>Sign Out</button>
        {session?  (
            <h2>Welcome</h2>
        ):(
            <>
                <Link href='/login'>Login</Link>
                <Link href='/register'>Register</Link>
            </>
        )}
    </div>
  )
}

export default Header
