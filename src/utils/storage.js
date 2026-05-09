const STORAGE_KEY = 'routine-app-data-v1'

export const defaultData = {
  routines: [],
  exams: [],
  notes: [],
  reminders: [],
  theme: 'dark',
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    return { ...defaultData, ...JSON.parse(raw) }
  } catch {
    return defaultData
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
