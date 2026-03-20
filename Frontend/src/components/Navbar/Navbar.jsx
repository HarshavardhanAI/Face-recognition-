import React from 'react';
import {useState} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from './SideBar';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  let [isOpen, setIsOpen] = useState(false);

  return <>
    <div className=" text-white bg-[#58a6ff] h-14 md:h-16 flex justify-between items-center px-5 text-xl md:text-xl sticky top-0 z-50">
      
      {/* left side of navbar */}
      <aside className='flex items-center gap-4 cursor-pointer'>
        <div className='text-2xl md:hidden' onClick={()=>setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </div>
        <h1 className='font-bold text-xl md:text-xl'>VisionID</h1>
      </aside>

      {/* right side of navbar */}
      <aside className='hidden md:flex items-center gap-4 text-bold '>
        <NavLink to="/" className='hover:underline'>Dashboard</NavLink>
        <NavLink to="/add-image" className='hover:underline'>Add Image</NavLink>
        <NavLink to="/database" className='hover:underline'>Database</NavLink>
        <NavLink to="/about" className='hover:underline'>About</NavLink>
      </aside>
    </div>
    {/* mobile view  */}
    {isOpen && (<SideBar/>
    )}
  </>
}

export default Navbar
