import React from 'react'

export default function Card(props) {
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

