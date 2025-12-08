import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [theme, setTheme] = useState('light');

  const Navlinks = <>
  <li><NavLink to='/' className='text-primary'>Home</NavLink></li>
  <li><NavLink to='/services' className='text-primary'>Services</NavLink></li>
  <li><NavLink to='/about' className='text-primary'>About</NavLink></li>
  <li><NavLink to='/contact' className='text-primary'>Contact</NavLink></li>
  {
    isLoggedIn && 
    <>
    <li><NavLink to='/coverage' className='text-primary'>Coverage</NavLink></li>
    <li><NavLink to='/dashboard' className='text-primary'>Dashboard</NavLink></li>
    </>
  }
  </>

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="drawer z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-100 shadow-lg">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          
          {/* Brand Name */}
          <div className="flex-1 px-2 mx-2">
            <span className="text-2xl font-bold text-primary">StyleDecor</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {Navlinks}
            </ul>
          </div>

          {/* Login/Profile Section */}
          <div className="flex-none">
            {!isLoggedIn ? (
              <Link to='/signup' className="btn btn-ghost">Login</Link>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a onClick={toggleTheme} className="justify-between">
                      <span>Theme</span>
                      <span className="badge">{theme === 'light' ? '🌙 Dark' : '☀️ Light'}</span>
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Drawer Menu */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200">
          {/* Brand in Mobile Menu */}
          <li className="mb-6">
            <span className="text-2xl font-bold text-primary">StyleDecor</span>
          </li>
          
          {Navlinks}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;