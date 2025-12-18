import React from 'react'

export default function Predict(){
  const [file, setFile] = React.useState(null)
  const [preview, setPreview] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const API_URL = import.meta.env.VITE_PREDICT_URL || ''

  React.useEffect(()=>{
    if(!file){
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return ()=> URL.revokeObjectURL(url)
  }, [file])

  function handleFile(e){
    const f = e.target.files && e.target.files[0]
    if(f) setFile(f)
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(!file) return
    setLoading(true)
    setResult(null)
    if(!API_URL){
      // No endpoint configured — fallback to demo response
      await new Promise(r=>setTimeout(r, 800))
      setLoading(false)
      setResult('Hasil prediksi: demo (tidak ada model terhubung)')
      return
    }

    try{
      const fd = new FormData()
      fd.append('image', file)
      const res = await fetch(API_URL, { method: 'POST', body: fd })
      if(!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      // expect server to return { result: '...' } or similar
      setResult(data.result ?? JSON.stringify(data))
    }catch(err){
      setResult('Error: ' + err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="py-24 bg-gradient-to-b from-pink-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Upcoming Racing Prediction</h2>
        <p className="mb-6 text-slate-700">Upload gambar untuk mencoba prediksi (demo).</p>

        <form onSubmit={handleSubmit} className="bg-white/80 p-6 rounded-lg shadow-md inline-block text-left w-full">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Pilih Gambar</span>
            <input type="file" accept="image/*" onChange={handleFile} className="mt-3 block w-full" />
          </label>

          <div className="mt-4">
            {preview ? (
              <div className="mx-auto w-60 h-40 rounded overflow-hidden shadow-sm">
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="mx-auto w-60 h-40 rounded bg-gray-50 flex items-center justify-center text-slate-400 shadow-sm">Preview akan tampil di sini</div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button type="submit" disabled={!file || loading} className="px-6 py-2 bg-pink-500 text-white rounded-full shadow disabled:opacity-50">
              {loading ? 'Memproses...' : 'Prediksi'}
            </button>
            {file && (
              <button type="button" onClick={()=>{ setFile(null); setResult(null) }} className="px-4 py-2 border rounded">Hapus</button>
            )}
          </div>
        </form>

        {result && (
          <div className="mt-6 bg-white p-4 rounded shadow inline-block">
            <div className="text-sm text-slate-700">{result}</div>
          </div>
        )}
      </div>
    </div>
  )
}
