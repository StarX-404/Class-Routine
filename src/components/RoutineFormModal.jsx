import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const emptyForm = { id: null, day: 'Monday', timeSlot: '', course: '', teacher: '', room: '', color: '#6366F1', notesText: '', examText: '', reminderText: '' }

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export default function RoutineFormModal({ open, onClose, onSave, editing, prefill, timeSlots }) {
  const [form, setForm] = useState(emptyForm)
  useEffect(() => {
    const source = editing ? {
      ...editing,
      notesText: (editing.notes || []).join('\n'),
      examText: (editing.exams || []).join('\n'),
      reminderText: (editing.reminders || []).join('\n'),
    } : { ...emptyForm, day: prefill?.day || 'Monday', timeSlot: prefill?.timeSlot || timeSlots?.[0] || '' }
    setForm(source)
  }, [editing, open, timeSlots, prefill])

  if (!open) return null

  const onSubmit = () => {
    onSave({
      id: form.id || crypto.randomUUID(),
      day: form.day,
      timeSlot: form.timeSlot,
      course: form.course,
      teacher: form.teacher,
      room: form.room,
      color: form.color,
      notes: form.notesText.split('\n').map(v => v.trim()).filter(Boolean),
      exams: form.examText.split('\n').map(v => v.trim()).filter(Boolean),
      reminders: form.reminderText.split('\n').map(v => v.trim()).filter(Boolean),
    })
    onClose()
  }

  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass w-full max-w-2xl rounded-3xl p-5">
      <h3 className="mb-4 text-lg font-semibold">{form.id ? 'Edit Cell Entry' : 'Add Cell Entry'}</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <select className="rounded-xl bg-white/40 p-3 dark:bg-slate-800/70" value={form.day} onChange={e => setForm({ ...form, day: e.target.value })}>{days.map(d => <option key={d}>{d}</option>)}</select>
        <select className="rounded-xl bg-white/40 p-3 dark:bg-slate-800/70" value={form.timeSlot} onChange={e => setForm({ ...form, timeSlot: e.target.value })}>{timeSlots.map(s => <option key={s}>{s}</option>)}</select>
        {['course', 'teacher', 'room'].map((f) => <input key={f} className="rounded-xl bg-white/40 p-3 dark:bg-slate-800/70" placeholder={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />)}
        <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="h-12 rounded-xl" />
        <textarea className="rounded-xl bg-white/40 p-3 dark:bg-slate-800/70 md:col-span-2" placeholder="Notes (1 per line)" value={form.notesText} onChange={e => setForm({ ...form, notesText: e.target.value })} />
        <textarea className="rounded-xl bg-white/40 p-3 dark:bg-slate-800/70" placeholder="Exams (1 per line)" value={form.examText} onChange={e => setForm({ ...form, examText: e.target.value })} />
        <textarea className="rounded-xl bg-white/40 p-3 dark:bg-slate-800/70" placeholder="Reminders (1 per line)" value={form.reminderText} onChange={e => setForm({ ...form, reminderText: e.target.value })} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="rounded-xl px-4 py-2">Cancel</button>
        <button onClick={onSubmit} className="rounded-xl bg-indigo-500 px-4 py-2 text-white">Save</button>
      </div>
    </motion.div>
  </div>
}
