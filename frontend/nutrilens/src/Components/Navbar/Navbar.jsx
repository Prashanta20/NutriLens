import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo-container">
      </div>
      <ul ref={menuRef} className="nav-menu">
        <li><p>Sign Up</p></li>
        
      </ul>
    </div>
  )
}

export default Navbar
