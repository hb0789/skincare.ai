import React from 'react'
import './tokencard.css'

export default function TokenCard(props) {
  return (
    <div className='token-card'>
        {props.title}
    </div>
  )
}
