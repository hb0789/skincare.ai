import React, {useState} from 'react'

const NavItem = (props) => {
    const [open, setOpen] = useState(false);
  return (
    <div className='profile-photo-div1'>
      <button className='profphoto' onClick={() => setOpen(!open)}>
        <img className= "profile-photo" src={props.image ?? ""}/>
      </button>
        {open && props.children}
      
    </div>
  )
}

export default NavItem
