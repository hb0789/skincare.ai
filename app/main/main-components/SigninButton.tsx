"use client";

import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import React from 'react'

const SigninButton = () => {
    const {data: session} = useSession();
    if(session && session.user)
    {
        return(
            <div className='flex gap-4 ml-auto text-2xl items-center'>
              {session.user.name}
                <button onClick={() => signOut()}>
                <div className='profile-photo-div'>
                <img className= "profile-photo" src={session.user.image ?? ""}/>
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
