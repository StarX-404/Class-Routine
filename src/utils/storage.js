const STORAGE_KEY = 'routine-app-data-v2'

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export const defaultData = {
  slotCount: 6,
  timeSlots: ['08:00-09:00','09:00-10:00','10:00-11:00','11:00-12:00','13:00-14:00','14:00-15:00'],
  routines: [],
  notes: [],
  reminders: [],
  theme: 'dark',
}

function migrateLegacy(data) {
  const migrated = { ...defaultData, ...data }
  migrated.slotCount = Number(migrated.slotCount) || defaultData.slotCount
  if (!Array.isArray(migrated.timeSlots) || !migrated.timeSlots.length) {
    migrated.timeSlots = defaultData.timeSlots.slice(0, migrated.slotCount)
  }
  migrated.routines = (migrated.routines || []).map((item, idx) => ({
    id: item.id || crypto.randomUUID(),
    day: days.includes(item.day) ? item.day : 'Monday',
    timeSlot: item.timeSlot || item.start && item.end ? `${item.start}-${item.end}` : migrated.timeSlots[idx % migrated.timeSlots.length],
    course: item.course || '',
    teacher: item.teacher || '',
    room: item.room || item.classroom || '',
    notes: Array.isArray(item.notes) ? item.notes : [],
    exams: Array.isArray(item.exams) ? item.exams : [],
    reminders: Array.isArray(item.reminders) ? item.reminders : [],
    color: item.color || '#6366F1',
  }))
  return migrated
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('routine-app-data-v1')
    if (!raw) return defaultData
    return migrateLegacy(JSON.parse(raw))
  } catch {
    return defaultData
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
