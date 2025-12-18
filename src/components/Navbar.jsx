import React from 'react'

export default function Navbar(){
  const [active, setActive] = React.useState('home')

  React.useEffect(()=>{
    const sections = ['home','character','predict']
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          setActive(e.target.id)
        }
      })
    }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 })

    sections.forEach(id=>{
      const el = document.getElementById(id)
      if(el) obs.observe(el)
    })
    return ()=> obs.disconnect()
  }, [])

  return (
    <header className="fixed w-full z-30 top-0 left-0 bg-white/30 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">Umazing Team</div>
        </div>
        <ul className="hidden md:flex gap-6 items-center text-sm">
          <li><a href="#home" className={active==='home'? 'nav-active' : ''}>Home</a></li>
          <li><a href="#character" className={active==='character'? 'nav-active' : ''}>Character</a></li>
          <li><a href="#predict" className={active==='predict'? 'nav-active' : ''}>Predict</a></li>
        </ul>
        <div className="md:hidden">
          <MobileMenu active={active} setActive={setActive} />
        </div>
      </nav>
    </header>
  )
}

function MobileMenu({active, setActive}){
  const [open, setOpen] = React.useState(false)
  function closeAndNavigate(id){
    setOpen(false)
    setTimeout(()=>{
      const el = document.getElementById(id)
      if(el) el.scrollIntoView({ behavior: 'smooth' })
      setActive(id)
    }, 80)
  }
  return (
    <div className="relative">
      <button onClick={()=>setOpen(v=>!v)} className="p-2 rounded bg-white/60 shadow">Menu</button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white/90 rounded-lg shadow-lg w-44 py-2">
          <button onClick={()=>closeAndNavigate('home')} className={`w-full text-left px-4 py-2 ${active==='home'?'font-semibold text-pink-500':''}`}>Home</button>
          <button onClick={()=>closeAndNavigate('character')} className={`w-full text-left px-4 py-2 ${active==='character'?'font-semibold text-pink-500':''}`}>Character</button>
          <button onClick={()=>closeAndNavigate('predict')} className={`w-full text-left px-4 py-2 ${active==='predict'?'font-semibold text-pink-500':''}`}>Predict</button>
        </div>
      )}
    </div>
  )
}
