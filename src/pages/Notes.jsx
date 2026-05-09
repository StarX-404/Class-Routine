import GlassCard from '../components/GlassCard'

export default function Notes({ routines }) {
  const noteItems = routines.flatMap(r => r.notes.map((n, i) => ({ id: `${r.id}-${i}`, course: r.course, note: n })))
  return <GlassCard><h2 className="mb-4 text-xl font-bold">Short Notes (from timetable entries)</h2><div className="grid gap-3 md:grid-cols-2">{noteItems.map(n => <div key={n.id} className="rounded-xl bg-white/20 p-3 dark:bg-slate-800/70"><span className="font-semibold">{n.course}</span><p>{n.note}</p></div>)}</div></GlassCard>
}
