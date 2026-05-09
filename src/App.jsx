import { useEffect, useMemo, useState } from 'react'
import Layout from './components/Layout'
import RoutineFormModal from './components/RoutineFormModal'
import ScanRoutineModal from './components/ScanRoutineModal'
import Dashboard from './pages/Dashboard'
import Routine from './pages/Routine'
import Exams from './pages/Exams'
import Notes from './pages/Notes'
import Settings from './pages/Settings'
import { useLocalData } from './hooks/useLocalData'

const slotsForCount = (count) => Array.from({ length: count }, (_, i) => `${String(8 + i).padStart(2, '0')}:00-${String(9 + i).padStart(2, '0')}:00`)

export default function App() {
  const [page, setPage] = useState('routine')
  const [modalOpen, setModalOpen] = useState(false)
  const [scanOpen, setScanOpen] = useState(false)
  const [prefillCell, setPrefillCell] = useState(null)
  const [editing, setEditing] = useState(null)
  const [data, setData] = useLocalData()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', data.theme === 'dark')
  }, [data.theme])

  const setTheme = (theme) => setData((d) => ({ ...d, theme }))
  const setSlotCount = (count) => setData(d => ({ ...d, slotCount: count, timeSlots: slotsForCount(count) }))
  const saveRoutine = (routine) => setData(d => ({ ...d, routines: d.routines.some(r => r.id === routine.id) ? d.routines.map(r => r.id === routine.id ? routine : r) : [...d.routines, routine] }))

  const pageContent = useMemo(() => ({
    dashboard: <Dashboard routines={data.routines} />,
    routine: <Routine routines={data.routines} timeSlots={data.timeSlots} slotCount={data.slotCount} setSlotCount={setSlotCount} onAddCell={(day,timeSlot)=>{setPrefillCell({day,timeSlot}); setEditing(null); setModalOpen(true)}} onEdit={(r) => { setEditing(r); setPrefillCell(null); setModalOpen(true) }} onDelete={(id) => setData(d => ({ ...d, routines: d.routines.filter(r => r.id !== id) }))} />,
    exams: <Exams routines={data.routines} />,
    notes: <Notes routines={data.routines} />,
    settings: <Settings theme={data.theme} setTheme={setTheme} onScan={() => setScanOpen(true)} />,
  }), [data])

  return <>
    <Layout page={page} setPage={setPage} onAdd={() => { setEditing(null); setPrefillCell(null); setModalOpen(true) }}>{pageContent[page]}</Layout>
    <RoutineFormModal open={modalOpen} editing={editing} prefill={prefillCell} timeSlots={data.timeSlots} onClose={() => setModalOpen(false)} onSave={saveRoutine} />
    <ScanRoutineModal open={scanOpen} timeSlots={data.timeSlots} onClose={() => setScanOpen(false)} onConfirm={(items) => setData(d => {
      const map = new Map(d.routines.map(r => [`${r.day}-${r.timeSlot}`, r]))
      items.forEach(it => map.set(`${it.day}-${it.timeSlot}`, it))
      return { ...d, routines: [...map.values()] }
    })} />
  </>
}
