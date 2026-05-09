import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock3, NotebookPen } from 'lucide-react'
import GlassCard from '../components/GlassCard'

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

function DetailModal({ item, onClose, onEdit, onDelete }) {
  if (!item) return null
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"><div className="glass w-full max-w-xl rounded-3xl p-5"><h3 className="text-xl font-semibold">{item.course}</h3><p className="mt-1 text-sm">{item.day} • {item.timeSlot}</p><p className="mt-2">Teacher: {item.teacher || '—'}</p><p>Room: {item.room || '—'}</p><div className="mt-4 grid gap-3 md:grid-cols-3"><div><h4 className="font-semibold">Notes</h4>{item.notes.map((v, i) => <p key={i} className="text-sm">• {v}</p>)}</div><div><h4 className="font-semibold">Exams</h4>{item.exams.map((v, i) => <p key={i} className="text-sm">• {v}</p>)}</div><div><h4 className="font-semibold">Reminders</h4>{item.reminders.map((v, i) => <p key={i} className="text-sm">• {v}</p>)}</div></div><div className="mt-5 flex justify-end gap-2"><button className="rounded-xl px-4 py-2" onClick={onClose}>Close</button><button className="rounded-xl bg-blue-500 px-4 py-2 text-white" onClick={() => { onEdit(item); onClose() }}>Edit</button><button className="rounded-xl bg-red-500 px-4 py-2 text-white" onClick={() => { onDelete(item.id); onClose() }}>Delete</button></div></div></div>
}

export default function Routine({ routines, onEdit, onDelete, timeSlots, slotCount, setSlotCount }) {
  const [active, setActive] = useState(null)
  const gridMap = useMemo(() => {
    const map = {}
    routines.forEach(r => { map[`${r.day}-${r.timeSlot}`] = r })
    return map
  }, [routines])

  return <GlassCard>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold">Weekly Timetable</h2><label className="text-sm">Columns <select value={slotCount} onChange={(e) => setSlotCount(Number(e.target.value))} className="ml-2 rounded-lg bg-white/30 px-2 py-1 dark:bg-slate-800/70">{[4,6,8,10].map(n => <option key={n} value={n}>{n}</option>)}</select></label></div>
    <div className="hidden overflow-auto md:block"><table className="min-w-full border-separate border-spacing-2 text-sm"><thead><tr><th className="glass sticky left-0 z-20 rounded-xl p-2">Day</th>{timeSlots.map(slot => <th key={slot} className="glass sticky top-0 rounded-xl p-2">{slot}</th>)}</tr></thead><tbody>{days.map(day => <tr key={day}><td className="glass sticky left-0 z-10 rounded-xl p-2 font-semibold">{day}</td>{timeSlots.map(slot => {const item = gridMap[`${day}-${slot}`]; return <td key={slot} className="min-w-32"><motion.button whileHover={{ scale: 1.01 }} onClick={() => item && setActive(item)} className="h-20 w-full rounded-xl border border-white/20 p-2 text-left" style={{ backgroundColor: item ? `${item.color}26` : 'transparent' }}>{item ? <><div className="truncate font-semibold">{item.course}</div><div className="mt-2 flex gap-1 text-xs">{item.exams.length > 0 && <span title="Exam"><AlertTriangle size={14} /></span>}{item.notes.length > 0 && <span title="Notes"><NotebookPen size={14} /></span>}{item.reminders.length > 0 && <span title="Reminders"><Clock3 size={14} /></span>}</div></> : <span className="text-xs opacity-40">Empty</span>}</motion.button></td>})}</tr>)}</tbody></table></div>

    <div className="space-y-3 md:hidden">{days.map(day => <div key={day} className="rounded-2xl bg-white/20 p-3 dark:bg-slate-800/60"><h3 className="mb-2 font-semibold">{day}</h3><div className="grid grid-cols-2 gap-2">{timeSlots.map(slot => {const item = gridMap[`${day}-${slot}`]; return <button key={slot} onClick={() => item && setActive(item)} className="rounded-xl border border-white/20 p-2 text-left text-xs" style={{ backgroundColor: item ? `${item.color}26` : 'transparent' }}><div className="truncate opacity-70">{slot}</div><div className="truncate font-semibold">{item?.course || 'Empty'}</div></button>})}</div></div>)}</div>

    <DetailModal item={active} onClose={() => setActive(null)} onEdit={onEdit} onDelete={onDelete} />
  </GlassCard>
}
