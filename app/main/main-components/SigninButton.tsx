"use client";

import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import React from 'react'

const SigninButton = () => {
    const {data: session} = useSession();
    if(session && session.user)
    {
        return(
            <div className='flex gap-4 ml-auto'>
                <p className='text-white'>Welcome! {session.user.name}</p>
                <button onClick={() => signOut()}>
                <div className='main-signin-button'>
                  Sign out
                </div>
                </button>
            </div>
        )
    }
  return (
    <button className='ml-auto' onClick={() => signIn()}>
      <div className='main-signin-button'>
        Sign In
      </div>
    </button>
  )
}

export default SigninButton
