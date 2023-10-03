import React from 'react'
import  "../Style/CardStyle.css"
interface cardProp{
  title:string;
  description : string;
  img : string;
}
export default function Card(props : cardProp) {
  return (
    <div className='service-card'>
      <div className='card-image-div'>
        <img src={props.img} className='card-image'/>
      </div>
      <div className='card-title'>
        {props.title}
      </div>
      <div className='card-description'>
        {props.description}
      </div>
    </div>
  )
}

