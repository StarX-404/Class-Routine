import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '' }) {
  return (
    <motion.div whileHover={{ y: -3 }} className={`glass rounded-3xl p-4 ${className}`}>
      {children}
    </motion.div>
  )
}
