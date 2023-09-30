import React from 'react'
import { Inter } from 'next/font/google'
import { Parallax } from 'react-parallax';
import Background from '../media/download.png'

const inter = Inter({
  subsets: ['latin'],
  weight: '400'
});

export default function Main() {
  const imageUrl = Background.src;
  return (
    <Parallax className='home-background' bgImage={imageUrl} strength={500}> 
      <div className = {'poppins.className home-title'}>
        Skincare.ai <br/>
        <div className={'home-description'}>
          Worried about skin issues?<br/>
        </div><br/> 
      </div>
      <div className='home-button-div'>
      <button className='home-button'>
          Get started  →
      </button>
      </div>
    </Parallax>
  )
}
