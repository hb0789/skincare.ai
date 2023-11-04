import { CircleStackIcon } from '@heroicons/react/20/solid'
import { PlayCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import React from 'react'
import SigninButton from './SigninButton';
import { useRouter } from "next/navigation";
import "../styles/Main.css"
export default function Navbar() {
  
  const router = useRouter();
  return (
    <div className=' navbar-main'>
        <button className='home-button-main' onClick={e => router.push('/main')}>Skincare.ai</button>
        <SigninButton/>
    </div>
  )
}
