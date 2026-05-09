import { useMemo, useState } from 'react'
import Layout from './components/Layout'
import RoutineFormModal from './components/RoutineFormModal'
import Dashboard from './pages/Dashboard'
import Routine from './pages/Routine'
import Exams from './pages/Exams'
import Notes from './pages/Notes'
import Settings from './pages/Settings'
import { useLocalData } from './hooks/useLocalData'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [data, setData] = useLocalData()

  const setTheme = (theme) => setData((d) => ({ ...d, theme }))
  document.documentElement.classList.toggle('dark', data.theme === 'dark')

  const saveRoutine = (routine) => setData(d => ({ ...d, routines: d.routines.some(r => r.id === routine.id) ? d.routines.map(r => r.id === routine.id ? routine : r) : [...d.routines, routine] }))

  const pageContent = useMemo(() => ({
    dashboard: <Dashboard routines={data.routines} exams={data.exams} reminders={data.reminders} />,
    routine: <Routine routines={data.routines} onEdit={(r) => { setEditing(r); setModalOpen(true) }} onDelete={(id) => setData(d => ({ ...d, routines: d.routines.filter(r => r.id !== id) }))} />,
    exams: <Exams exams={data.exams} setExams={(fn) => setData(d => ({ ...d, exams: fn(d.exams) }))} />,
    notes: <Notes notes={data.notes} setNotes={(fn) => setData(d => ({ ...d, notes: fn(d.notes) }))} />,
    settings: <Settings theme={data.theme} setTheme={setTheme} />,
  }), [data, setData])

  return <>
    <Layout page={page} setPage={setPage} onAdd={() => { setEditing(null); setModalOpen(true) }}>{pageContent[page]}</Layout>
    <RoutineFormModal open={modalOpen} editing={editing} onClose={() => setModalOpen(false)} onSave={saveRoutine} />
  </>
}
