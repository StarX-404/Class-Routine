import GlassCard from '../components/GlassCard'

export default function Dashboard({ routines }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const todayClasses = routines.filter(r => r.day === today)
  const upcomingExams = routines.flatMap(r => r.exams.map(e => ({ course: r.course, text: e, slot: r.timeSlot }))).slice(0, 5)
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <GlassCard className="lg:col-span-2"><h2 className="mb-3 text-xl font-bold">Today's Classes</h2><div className="space-y-2">{todayClasses.length ? todayClasses.map(c => <div key={c.id} className="rounded-2xl p-3" style={{ backgroundColor: `${c.color}22`, borderLeft: `4px solid ${c.color}` }}>{c.timeSlot} • {c.course} • {c.room}</div>) : <p>No classes today.</p>}</div></GlassCard>
      <GlassCard><h2 className="mb-3 text-xl font-bold">Upcoming Exams</h2><div className="space-y-2">{upcomingExams.map((e, i) => <div key={i} className="rounded-xl bg-white/20 p-3 dark:bg-slate-800/70">{e.course} - {e.text} ({e.slot})</div>)}</div></GlassCard>
      <GlassCard className="lg:col-span-3"><h2 className="mb-3 text-xl font-bold">Active Reminders</h2><div className="grid gap-3 md:grid-cols-3">{routines.flatMap(r => r.reminders.map((x, i) => <div key={`${r.id}-${i}`} className="rounded-xl bg-amber-300/20 p-3">{r.course}: {x}</div>))}</div></GlassCard>
    </div>
  )
}
