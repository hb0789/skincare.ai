"use client";

import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import React, {useState} from 'react'
import NavItem from './NavItem.jsx';

const SigninButton = () => {
    const [open, setOpen] = useState(false);
    const {data: session} = useSession();
    if(session && session.user)
    {
        return(
            <div className='flex gap-4 ml-auto text-2xl items-center'>
                  <NavItem image = {session.user.image}>
                    <div className='dropdown-menu'>
                      <div>
                      {session.user.name}
                      </div>
                      <div>
                        {session.user.email}
                      </div>
                      <hr/>
                      <div>
                        Settings
                      </div>
                      <div>
                        Profile
                      </div>
                      <div>
                      <button onClick={() => signOut()}>
                        <div className='main-signout-button'>
                          Sign out
                        </div>
                      </button>
                      </div>
                    </div>
                  </NavItem>
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
