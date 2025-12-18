import React from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import Character from './sections/Character'
import Predict from './sections/Predict'

export default function App(){
  return (
    <div className="font-sans text-slate-900">
      <Navbar />
      <main>
        <section id="home"><Home /></section>
        <section id="character"><Character /></section>
        <section id="predict"><Predict /></section>
      </main>
    </div>
  )
}
