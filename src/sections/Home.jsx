import React from 'react'
import { motion } from 'framer-motion'

export default function Home(){
  const [hero, setHero] = React.useState(null)

  React.useEffect(()=> {
    fetch('https://uma-api-chi.vercel.app/characters')
      .then(res=>res.json())
      .then(data=>{
        if(Array.isArray(data) && data.length) setHero(data[2])
      })
  },[])

  return (
    <div className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden text-white">

      {/* animated aura orbs */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.4 }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl bg-pink-400 opacity-20"
      />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.4 }}
        className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full blur-3xl bg-purple-500 opacity-20"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-14 z-10"
      >
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, scale: .5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .2 }}
            className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs uppercase tracking-wider inline-block shadow-lg"
          >
            New Event — Race Season 2025
          </motion.span>

          <h1 className="leading-tight text-5xl md:text-6xl font-extrabold mt-4 mb-4 drop-shadow-lg">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500">Umazing Team</span>
          </h1>

          <p className="text-lg md:text-xl mb-6 text-white/90 drop-shadow-md">
            Discover unique horse girls, predict champions, and build your elite racing lineup.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <a href="#character">
              <motion.button 
                whileHover={{ scale: 1.08 }} 
                className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold shadow-xl"
              >
                Explore Characters
              </motion.button>
            </a>

            <a href="#predict">
              <motion.button 
                whileHover={{ scale: 1.08 }} 
                className="px-6 py-3 rounded-full border-white border text-white font-semibold backdrop-blur-md"
              >
                Try Prediction
              </motion.button>
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-64 h-96 md:w-80 md:h-[520px] relative group">
            <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"></div>

            {hero ? (
              <motion.img
                src={hero.image}
                alt={hero.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative mx-auto h-full object-cover rounded-3xl"
              />
            ) : (
              <div className="relative h-full flex items-center justify-center text-white">
                Loading hero...
              </div>
            )}

            {/* glow ring animation */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: .2 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 rounded-3xl border-2 border-pink-300"
            />
          </div>
        </div>
      </motion.div>

      {/* running silhouettes */}
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: -1200 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 opacity-20 pointer-events-none"
      >
        <img 
          src="https://i.imgur.com/y6lG6C2.png" 
          alt="running horses"
          className="w-[1000px] h-auto"
        />
      </motion.div>

      {/* star particles */}
      {[...Array(18)].map((_, i)=>(
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .5, delay: i/10 }}
          className="absolute w-1 h-1 bg-white rounded-full shadow-lg"
          style={{
            top: `${Math.random()*100}%`,
            left: `${Math.random()*100}%`,
            opacity: .35
          }}
        />
      ))}
    </div>
  )
}
