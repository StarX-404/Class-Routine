import GlassCard from '../components/GlassCard'

export default function Routine({ routines, onEdit, onDelete }) {
  const grouped = routines.reduce((acc, item) => ((acc[item.day] ??= []).push(item), acc), {})
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Object.entries(grouped).map(([day, items]) => <GlassCard key={day}><h3 className="mb-3 text-lg font-semibold">{day}</h3><div className="space-y-2">{items.map(i => <div key={i.id} className="rounded-2xl p-3" style={{ backgroundColor: `${i.color}1F` }}><div className="font-semibold">{i.course}</div><div className="text-sm">{i.teacher} • {i.classroom}</div><div className="text-sm">{i.start} - {i.end}</div><div className="mt-2 flex gap-2"><button onClick={() => onEdit(i)} className="rounded-lg bg-white/30 px-3 py-1 text-xs">Edit</button><button onClick={() => onDelete(i.id)} className="rounded-lg bg-red-500/70 px-3 py-1 text-xs text-white">Delete</button></div></div>)}</div></GlassCard>)}
  </div>
}
