import { useState } from 'react'
import { motion } from 'framer-motion'
import Tesseract from 'tesseract.js'

function parseText(text, timeSlots) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  return lines.map((line, i) => {
    const parts = line.split(/,|\||-/).map(p => p.trim()).filter(Boolean)
    return {
      id: crypto.randomUUID(),
      day: dayNames.find(d => line.toLowerCase().includes(d.toLowerCase())) || dayNames[i % 7],
      timeSlot: timeSlots.find(t => line.includes(t)) || timeSlots[i % timeSlots.length],
      course: parts[0] || `Course ${i+1}`,
      teacher: parts[1] || '',
      room: parts[2] || '',
      notes: [], exams: [], reminders: [], color: '#6366F1',
    }
  })
}

export default function ScanRoutineModal({ open, onClose, timeSlots, onConfirm }) {
  const [preview, setPreview] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  if (!open) return null

  const handleFile = async (file) => {
    try {
      setError('')
      setLoading(true)
      const { data } = await Tesseract.recognize(file, 'eng')
      setPreview(parseText(data.text, timeSlots))
    } catch {
      setError('OCR failed. Try a clearer image.')
    } finally {
      setLoading(false)
    }
  }

  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"><motion.div initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} className="glass w-full max-w-3xl rounded-3xl p-5"><h3 className="mb-3 text-lg font-semibold">Scan Routine</h3><input type="file" accept="image/*" capture="environment" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="mb-4 block w-full" />{loading && <p>Scanning image...</p>}{error && <p className="text-rose-500">{error}</p>}<div className="max-h-72 overflow-auto rounded-xl border border-white/20"><table className="w-full text-sm"><thead><tr><th className="p-2 text-left">Day</th><th className="p-2 text-left">Slot</th><th className="p-2 text-left">Course</th><th className="p-2 text-left">Teacher</th><th className="p-2 text-left">Room</th></tr></thead><tbody>{preview.map((r,idx) => <tr key={r.id}><td className="p-2"><input value={r.day} onChange={(e)=>setPreview(p=>p.map((x,i)=>i===idx?{...x,day:e.target.value}:x))} className="w-full rounded bg-white/20 px-2 py-1"/></td><td className="p-2"><input value={r.timeSlot} onChange={(e)=>setPreview(p=>p.map((x,i)=>i===idx?{...x,timeSlot:e.target.value}:x))} className="w-full rounded bg-white/20 px-2 py-1"/></td><td className="p-2"><input value={r.course} onChange={(e)=>setPreview(p=>p.map((x,i)=>i===idx?{...x,course:e.target.value}:x))} className="w-full rounded bg-white/20 px-2 py-1"/></td><td className="p-2"><input value={r.teacher} onChange={(e)=>setPreview(p=>p.map((x,i)=>i===idx?{...x,teacher:e.target.value}:x))} className="w-full rounded bg-white/20 px-2 py-1"/></td><td className="p-2"><input value={r.room} onChange={(e)=>setPreview(p=>p.map((x,i)=>i===idx?{...x,room:e.target.value}:x))} className="w-full rounded bg-white/20 px-2 py-1"/></td></tr>)}</tbody></table></div><div className="mt-4 flex justify-end gap-2"><button onClick={onClose} className="rounded-xl px-4 py-2">Cancel</button><button onClick={() => { onConfirm(preview); onClose() }} className="rounded-xl bg-indigo-500 px-4 py-2 text-white">Confirm Import</button></div></motion.div></div>
}
