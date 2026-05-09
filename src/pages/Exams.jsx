import GlassCard from '../components/GlassCard'

export default function Exams({ exams, setExams }) {
  const addExam = () => {
    const course = prompt('Course name?')
    const date = prompt('Exam date (YYYY-MM-DD)?')
    if (!course || !date) return
    setExams(prev => [...prev, { id: crypto.randomUUID(), course, date }])
  }
  return <GlassCard><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">Exam Schedule</h2><button onClick={addExam} className="rounded-xl bg-indigo-500 px-3 py-2 text-white">Add exam</button></div><div className="space-y-2">{exams.map(e => <div key={e.id} className="flex items-center justify-between rounded-xl bg-white/20 p-3 dark:bg-slate-800/70"><span>{e.course}</span><span>{e.date}</span></div>)}</div></GlassCard>
}
