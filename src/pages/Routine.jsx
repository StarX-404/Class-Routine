import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock3, NotebookPen, Menu } from 'lucide-react'
import GlassCard from '../components/GlassCard'

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const shortDay = {Monday:'Mon',Tuesday:'Tue',Wednesday:'Wed',Thursday:'Thu',Friday:'Fri',Saturday:'Sat',Sunday:'Sun'}

function DetailModal({ item, onClose, onEdit, onDelete }) { if (!item) return null; return <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"><div className="glass w-full max-w-xl rounded-3xl p-5"><h3 className="text-xl font-semibold">{item.course}</h3><p className="text-sm text-slate-500">{item.day} • {item.timeSlot}</p><p className="mt-2">Teacher: {item.teacher || '—'} | Room: {item.room || '—'}</p><div className="mt-4 grid gap-2 text-sm md:grid-cols-3"><div>{item.notes.map((v,i)=><p key={i}>📝 {v}</p>)}</div><div>{item.exams.map((v,i)=><p key={i}>⚠ {v}</p>)}</div><div>{item.reminders.map((v,i)=><p key={i}>⏰ {v}</p>)}</div></div><div className="mt-4 flex justify-end gap-2"><button onClick={onClose}>Close</button><button className="rounded-lg bg-sky-500 px-3 py-1 text-white" onClick={()=>{onEdit(item);onClose()}}>Edit</button><button className="rounded-lg bg-rose-500 px-3 py-1 text-white" onClick={()=>{onDelete(item.id);onClose()}}>Delete</button></div></div></div> }

export default function Routine({ routines, onEdit, onDelete, timeSlots, slotCount, setSlotCount }) {
  const [active, setActive] = useState(null)
  const gridMap = useMemo(() => { const m = {}; routines.forEach(r => m[`${r.day}-${r.timeSlot}`] = r); return m }, [routines])
  return <GlassCard className="rounded-3xl p-4 md:p-6"><div className="mb-2 flex items-center justify-between"><div><h1 className="text-3xl font-extrabold tracking-tight">My Weekly Routine</h1><p className="text-sm text-slate-500">May 20-24, 2024</p></div><Menu size={18} /></div><div className="mb-3 flex justify-end"><label className="text-xs text-slate-500">Manage Columns <select value={slotCount} onChange={e=>setSlotCount(Number(e.target.value))} className="ml-2 rounded-lg border bg-white px-2 py-1 dark:bg-slate-800">{[4,6,8,10].map(n=><option key={n}>{n}</option>)}</select></label></div>

  <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
    <table className="min-w-[760px] w-full text-xs">
      <thead><tr><th className="sticky left-0 z-20 bg-slate-100 p-2 dark:bg-slate-800"></th>{days.map(d=><th key={d} className="bg-slate-100 p-2 font-semibold text-slate-500 dark:bg-slate-800">{shortDay[d]}</th>)}</tr></thead>
      <tbody>{timeSlots.map(slot => <tr key={slot} className="border-t border-slate-200 dark:border-slate-700"><td className="sticky left-0 z-10 bg-white p-2 text-slate-500 dark:bg-slate-900">{slot.split('-')[0]}</td>{days.map(day=>{const item=gridMap[`${day}-${slot}`]; return <td key={day} className="h-20 w-28 border-l border-slate-200 p-1 align-top dark:border-slate-700"><motion.button whileHover={{scale:1.02}} onClick={()=>item&&setActive(item)} className="h-full w-full rounded-md p-1 text-left" style={{background:item?`${item.color}33`:'transparent'}}>{item && <><div className="truncate text-[11px] font-semibold">{item.course}</div><div className="mt-1 flex gap-1 text-[10px]">{item.exams.length>0 && <AlertTriangle size={12}/>} {item.notes.length>0 && <NotebookPen size={12}/>} {item.reminders.length>0 && <Clock3 size={12}/>}</div></>}</motion.button></td>})}</tr>)}</tbody>
    </table></div>

  <DetailModal item={active} onClose={()=>setActive(null)} onEdit={onEdit} onDelete={onDelete} />
  </GlassCard>
}
