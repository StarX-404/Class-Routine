import GlassCard from '../components/GlassCard'

export default function Exams({ routines }) {
  const examItems = routines.flatMap(r => r.exams.map((e, i) => ({ id: `${r.id}-${i}`, course: r.course, day: r.day, slot: r.timeSlot, exam: e })))
  return <GlassCard><h2 className="mb-4 text-xl font-bold">Exam Schedule (from timetable entries)</h2><div className="space-y-2">{examItems.map(e => <div key={e.id} className="flex items-center justify-between rounded-xl bg-white/20 p-3 dark:bg-slate-800/70"><span>{e.course}: {e.exam}</span><span>{e.day} {e.slot}</span></div>)}</div></GlassCard>
}
