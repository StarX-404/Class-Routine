import GlassCard from '../components/GlassCard'

export default function Settings({ theme, setTheme, onScan }) {
  return <GlassCard><h2 className="mb-4 text-xl font-bold">Settings</h2><div className="flex flex-wrap gap-2"><button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-xl bg-indigo-500 px-4 py-2 text-white">Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</button><button onClick={onScan} className="rounded-xl bg-emerald-500 px-4 py-2 text-white">Scan Routine</button></div></GlassCard>
}
