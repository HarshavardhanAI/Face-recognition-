import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
      <div className='md:hidden absolute top-14 left-0 right-0 bg-[#58a6ff] p-4 text-white h-full flex flex-col gap-5 z-40'>
        
        <NavLink to="/" className={({ isActive }) => 
          `p-3 rounded-lg  transition-all ${isActive ? 'bg-white/20 font-bold border-white/50' : 'hover:bg-white/10'}`
        }>Dashboard</NavLink>
        
        <NavLink to="/add-image" className={({ isActive }) => 
          `p-3 rounded-lg  transition-all ${isActive ? 'bg-white/20 font-bold border-white/50' : 'hover:bg-white/10'}`
        }>Add Image</NavLink>
        
        <NavLink to="/database" className={({ isActive }) => 
          `p-3 rounded-lg  transition-all ${isActive ? 'bg-white/20 font-bold border-white/50' : 'hover:bg-white/10'}`
        }>Database</NavLink>

        <NavLink to="/about" className={({ isActive }) => 
          `p-3 rounded-lg  transition-all ${isActive ? 'bg-white/20 font-bold border-white/50' : 'hover:bg-white/10'}`
        }>About</NavLink>
      </div>

  )
}

export default SideBar
