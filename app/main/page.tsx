"use client"
import React from 'react'
import "./styles/Navbar.css"
import "./styles/Main.css"
import Navbar from './main-components/Navbar'
import Body from './main-components/Body'

export default function page() {
  return (
    <div className='app-background'>
        <Navbar/>
    </div>
  )
}
