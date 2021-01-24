import React from "react";
import { NavLink } from "react-router-dom";
import { useComponent } from "./hook.js";
import Logo from "../../assets/catLogo.png";

export const Navbar = () => {
  const { navBarRef, isMobile } = useComponent();

  return (
    <nav className='navbar' ref={navBarRef}>
      <a href='https://github.com/CristinaVolk/test-cat-app'>
        {!isMobile ? <img className='logo' src={Logo} alt='logo' /> : null}
      </a>
      <ul className='navbar-link'>
        <li>
          <NavLink to='/' className='navbar-link-item'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/images/upload' className='navbar-link-item'>
            Upload a cat image
          </NavLink>
        </li>
        <li>
          <NavLink to='/images' className='navbar-link-item'>
            Get all your cats images
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
