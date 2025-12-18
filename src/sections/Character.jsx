import React from 'react'
import { motion } from 'framer-motion'
import Modal from '../components/Modal'

export default function Character(){
  const [chars, setChars] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [selected, setSelected] = React.useState(null)

  React.useEffect(()=>{
    fetch('https://uma-api-chi.vercel.app/characters')
      .then(res=>res.json())
      .then(data=>{
        if(Array.isArray(data)) setChars(data.slice(0, 7))
      })
      .catch(()=>{})
      .finally(()=>setLoading(false))
  },[])

  return (
    <div className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Characters</h2>
        <p className="mb-8 text-slate-600">Meet a selection of vibrant horse girls. Click a card to see details.</p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({length:7}).map((_,i)=> (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="h-44 skeleton rounded-xl"></div>
                <div className="p-3">
                  <div className="h-4 w-24 skeleton rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {chars.map((c)=> (
              <motion.div
                key={c.id}
                whileHover={{ scale: 1.04 }}
                className="rounded-xl shadow-lg overflow-hidden bg-white cursor-pointer"
                onClick={()=>setSelected(c)}
              >
                <div className="relative h-44 bg-gray-100">
                  <img loading="lazy" src={c.image} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">{c.name}</h3>
                  <div className="text-xs text-slate-500 mt-1 truncate">
                    {(() => {
                      const key = Object.keys(c).find(k => !['id','image','name'].includes(k) && c[k])
                      return key ? String(c[key]) : `ID: ${c.id}`
                    })()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <Modal open={!!selected} onClose={()=>setSelected(null)} title={selected?.name}>
          {selected && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-40 h-56 md:h-72 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-700">ID: {selected.id}</p>
                <div className="mt-3 text-sm text-slate-700 space-y-2">
                  {Object.entries(selected).filter(([k,v])=> !['id','image','name'].includes(k)).map(([k,v])=> (
                    <div key={k} className="flex gap-2">
                      <div className="w-28 text-slate-500 capitalize">{k.replace(/_/g,' ')}:</div>
                      <div className="flex-1 text-slate-800 truncate">{typeof v === 'string' || typeof v === 'number' ? String(v) : JSON.stringify(v)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}
