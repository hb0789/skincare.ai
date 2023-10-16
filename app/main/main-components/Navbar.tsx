import { CircleStackIcon } from '@heroicons/react/20/solid'
import { PlayCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import SigninButton from './SigninButton'

export default function Navbar() {
  return (
    <div className='navbar-main'>
        Skincare.ai
        <CircleStackIcon/>
        <SigninButton/>
    </div>
  )
}
