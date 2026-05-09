import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const initial = { id: null, course: '', teacher: '', classroom: '', day: 'Monday', start: '', end: '', color: '#6366F1' }

export default function RoutineFormModal({ open, onClose, onSave, editing }) {
  const [form, setForm] = useState(initial)
  useEffect(() => { setForm(editing || initial) }, [editing, open])
  if (!open) return null
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass w-full max-w-xl rounded-3xl p-5">
      <h3 className="mb-4 text-lg font-semibold">{form.id ? 'Edit' : 'Add'} Routine</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {['course', 'teacher', 'classroom', 'start', 'end'].map((f) => <input key={f} className="rounded-xl bg-white/40 p-3 dark:bg-slate-800/70" placeholder={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />)}
        <select className="rounded-xl bg-white/40 p-3 dark:bg-slate-800/70" value={form.day} onChange={e => setForm({ ...form, day: e.target.value })}>{['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => <option key={d}>{d}</option>)}</select>
        <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="h-12 rounded-xl" />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="rounded-xl px-4 py-2">Cancel</button>
        <button onClick={() => { onSave({ ...form, id: form.id || crypto.randomUUID() }); onClose() }} className="rounded-xl bg-indigo-500 px-4 py-2 text-white">Save</button>
      </div>
    </motion.div>
  </div>
}
