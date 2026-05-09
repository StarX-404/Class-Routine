import { CalendarDays, ClipboardList, House, NotebookText, Settings, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { key: 'dashboard', label: 'Routine', icon: House },
  { key: 'routine', label: 'Tasks', icon: CalendarDays },
  { key: 'exams', label: 'Grades', icon: ClipboardList },
  { key: 'notes', label: 'Notes', icon: NotebookText },
  { key: 'settings', label: 'Settings', icon: Settings },
]

export default function Layout({ page, setPage, children, onAdd }) {
  return (
    <div className="min-h-screen pb-24 md:pb-10">
      <div className="mx-auto max-w-7xl p-3 md:p-6">
        <header className="glass mb-4 rounded-2xl p-3">
          <div className="flex items-center justify-between text-sm font-medium text-slate-500"><div className="flex gap-4">{navItems.slice(0,3).map(({key,label}) => <button key={key} onClick={() => setPage(key)} className={page===key? 'text-slate-900 dark:text-white':''}>{label}</button>)}</div><span>👤</span></div>
        </header>
        {children}
      </div>
      <div className="glass fixed bottom-4 left-1/2 z-40 flex w-[92%] -translate-x-1/2 items-center justify-around rounded-2xl p-3 md:hidden">
        {navItems.map(({ key, icon: Icon }) => <button key={key} onClick={() => setPage(key)} className={`rounded-xl p-2 ${page === key ? 'bg-slate-200 dark:bg-slate-700' : ''}`}><Icon size={18} /></button>)}
      </div>
      <motion.button whileTap={{ scale: 0.93 }} whileHover={{ scale: 1.06 }} onClick={onAdd} className="fixed bottom-24 right-4 z-50 rounded-full bg-slate-100 p-4 text-slate-700 shadow-xl dark:bg-slate-800 dark:text-slate-100 md:bottom-8 md:right-8"><Plus /></motion.button>
    </div>
  )
}
