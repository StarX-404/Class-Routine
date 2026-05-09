import GlassCard from '../components/GlassCard'

export default function Notes({ notes, setNotes }) {
  const addNote = () => {
    const text = prompt('Write a short note')
    if (!text) return
    setNotes(prev => [...prev, { id: crypto.randomUUID(), text }])
  }
  return <GlassCard><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">Short Notes</h2><button onClick={addNote} className="rounded-xl bg-indigo-500 px-3 py-2 text-white">Add note</button></div><div className="grid gap-3 md:grid-cols-2">{notes.map(n => <div key={n.id} className="rounded-xl bg-white/20 p-3 dark:bg-slate-800/70">{n.text}</div>)}</div></GlassCard>
}
