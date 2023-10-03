import React from 'react'
import { Inter } from 'next/font/google'
import { Parallax } from 'react-parallax';
import Background from '../media/download.jpg'
import "../Style/MainStyle.css";

const inter = Inter({
  subsets: ['latin'],
  weight: '400'
});

export default function Main() {
  const imageUrl = Background.src;
  return (
    <Parallax className='home-background' bgImage={imageUrl} strength={300}> 
      <div className = {'poppins.className home-title'}>
        Skincare.ai <br/>
        <div className={'home-description'}>
          Worried about skin issues?
        </div><br/> 
      </div>
    </Parallax>
  )
}
