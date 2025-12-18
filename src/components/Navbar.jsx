import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="fixed w-full z-30 top-0 left-0 bg-white/30 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">Umazing Team</Link>
        </div>
        <ul className="hidden md:flex gap-6 items-center text-sm">
          <li><NavLink to="/" end className={({isActive})=> isActive ? 'nav-active' : ''}>Home</NavLink></li>
          <li><NavLink to="/character" className={({isActive})=> isActive ? 'nav-active' : ''}>Character</NavLink></li>
          <li><NavLink to="/predict" className={({isActive})=> isActive ? 'nav-active' : ''}>Predict</NavLink></li>
        </ul>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}

function MobileMenu(){
  const [open, setOpen] = React.useState(false)
  return (
    <div className="relative">
      <button onClick={()=>setOpen(v=>!v)} className="p-2 rounded bg-white/60 shadow">Menu</button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white/90 rounded-lg shadow-lg w-44 py-2">
          <Link to="/" onClick={()=>setOpen(false)} className="block w-full text-left px-4 py-2">Home</Link>
          <Link to="/character" onClick={()=>setOpen(false)} className="block w-full text-left px-4 py-2">Character</Link>
          <Link to="/predict" onClick={()=>setOpen(false)} className="block w-full text-left px-4 py-2">Predict</Link>
        </div>
      )}
    </div>
  )
}
