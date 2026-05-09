import GlassCard from '../components/GlassCard'

export default function Settings({ theme, setTheme }) {
  return <GlassCard><h2 className="mb-4 text-xl font-bold">Settings</h2><button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-xl bg-indigo-500 px-4 py-2 text-white">Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</button></GlassCard>
}
