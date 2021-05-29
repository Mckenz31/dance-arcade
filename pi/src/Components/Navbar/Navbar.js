import React, { useEffect, useRef } from 'react'
import { NavbarContainer } from './NavStyles'
const Navbar = ({handleLogout}) => {
  
    return (
        <NavbarContainer>
        <div class="container">
            <nav>
                <h1 class="brand"></h1>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#" onClick={handleLogout}>logout</a></li>
                </ul>
            </nav>
        </div>
		
    </NavbarContainer>
    )
}

export default Navbar
