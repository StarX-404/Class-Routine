const STORAGE_KEY = 'routine-app-data-v3'

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export const defaultData = {
  slotCount: 8,
  timeSlots: ['08:00-09:00','09:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00'],
  routines: [],
  theme: 'light',
}

const buildSlots = (count) => Array.from({ length: count }, (_, i) => `${String(8+i).padStart(2,'0')}:00-${String(9+i).padStart(2,'0')}:00`)

function migrateLegacy(data) {
  const migrated = { ...defaultData, ...data }
  migrated.slotCount = Number(migrated.slotCount) || defaultData.slotCount
  migrated.timeSlots = Array.isArray(migrated.timeSlots) ? migrated.timeSlots.slice(0, migrated.slotCount) : []
  if (migrated.timeSlots.length !== migrated.slotCount) migrated.timeSlots = buildSlots(migrated.slotCount)

  migrated.routines = (migrated.routines || []).map((item, idx) => {
    const slotFromLegacy = item.start && item.end ? `${item.start}-${item.end}` : ''
    return {
      id: item.id || crypto.randomUUID(),
      day: days.includes(item.day) ? item.day : days[idx % 7],
      timeSlot: item.timeSlot || slotFromLegacy || migrated.timeSlots[idx % migrated.timeSlots.length],
      course: item.course || '',
      teacher: item.teacher || '',
      room: item.room || item.classroom || '',
      notes: Array.isArray(item.notes) ? item.notes : [],
      exams: Array.isArray(item.exams) ? item.exams : [],
      reminders: Array.isArray(item.reminders) ? item.reminders : [],
      color: item.color || '#A7D4F6',
    }
  })
  return migrated
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('routine-app-data-v2') || localStorage.getItem('routine-app-data-v1')
    if (!raw) return defaultData
    return migrateLegacy(JSON.parse(raw))
  } catch {
    return defaultData
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
