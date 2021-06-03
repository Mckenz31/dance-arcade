import React from 'react';
import { NavbarContainer } from './NavStyles';
const Navbar = ({ handleLogout, toggleAbout }) => {
  return (
    <NavbarContainer>
      <div className="container">
        <nav>
          <h4 className="brand">Dance Dance Arcade</h4>
          <ul>
            <li>
              <span href="#">Home</span>
            </li>
            <li>
              <span href="#">Settings</span>
            </li>
            <li>
              <span href="#" onClick={toggleAbout}>
                About
              </span>
            </li>
            <li>
              <span href="#" onClick={handleLogout}>
                logout
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
