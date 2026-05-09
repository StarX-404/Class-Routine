import { CalendarDays, ClipboardList, House, NotebookText, Settings, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: House },
  { key: 'routine', label: 'Routine', icon: CalendarDays },
  { key: 'exams', label: 'Exams', icon: ClipboardList },
  { key: 'notes', label: 'Notes', icon: NotebookText },
  { key: 'settings', label: 'Settings', icon: Settings },
]

export default function Layout({ page, setPage, children, onAdd }) {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[240px_1fr]">
        <aside className="glass sticky top-4 hidden h-[calc(100vh-2rem)] rounded-3xl p-4 md:block">
          <h1 className="mb-8 text-xl font-bold">Class Routine</h1>
          <nav className="space-y-2">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setPage(key)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${page === key ? 'bg-indigo-500 text-white' : 'hover:bg-white/20'}`}>
                <Icon size={18} /> {label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="space-y-4">{children}</main>
      </div>

      <div className="glass fixed bottom-4 left-1/2 z-40 flex w-[92%] -translate-x-1/2 items-center justify-around rounded-2xl p-3 md:hidden">
        {navItems.map(({ key, icon: Icon }) => (
          <button key={key} onClick={() => setPage(key)} className={`rounded-xl p-2 ${page === key ? 'bg-indigo-500 text-white' : ''}`}>
            <Icon size={18} />
          </button>
        ))}
      </div>

      <motion.button whileTap={{ scale: 0.93 }} whileHover={{ scale: 1.06 }} onClick={onAdd} className="fixed bottom-24 right-4 z-50 rounded-full bg-indigo-500 p-4 text-white shadow-xl md:bottom-8 md:right-8">
        <Plus />
      </motion.button>
    </div>
  )
}
