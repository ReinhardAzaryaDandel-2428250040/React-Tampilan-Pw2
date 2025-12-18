import React from 'react'
import { motion } from 'framer-motion'

export default function Home(){
  const [hero, setHero] = React.useState(null)

  React.useEffect(()=>{
    // fetch a sample character to use as hero image
    fetch('https://uma-api-chi.vercel.app/characters')
      .then(res=>res.json())
      .then(data=>{
        if(Array.isArray(data) && data.length) setHero(data[0])
      }).catch(()=>{})
  },[])

  return (
    <div className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">Welcome to Umazing Team</h1>
          <p className="text-lg md:text-xl mb-6 text-slate-800">Discover unique horse girls and enter the world of racing predictions.</p>
          <a href="#character">
            <motion.button whileHover={{ scale: 1.03 }} className="inline-block px-6 py-3 rounded-full bg-pink-500 text-white font-semibold shadow-lg">Explore Characters</motion.button>
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-64 h-96 md:w-80 md:h-[520px] relative">
            <div className="absolute inset-0 rounded-3xl card-gradient shadow-2xl"></div>
            {hero ? (
              <motion.img
                src={hero.image}
                alt={hero.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative mx-auto h-full object-cover rounded-3xl"
              />
            ) : (
              <div className="relative h-full bg-gradient-to-b from-pink-200 to-yellow-100 rounded-3xl flex items-center justify-center"> 
                <span className="text-slate-500">Loading image...</span>
              </div>
            )}
          </div>
        </div>

      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g1" cx="20%" cy="10%">
              <stop offset="0%" stopColor="#ff9ac1" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ff9ac1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
        </svg>
      </div>
    </div>
  )
}
