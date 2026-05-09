import { useEffect, useState } from 'react'
import { loadData, saveData } from '../utils/storage'

export function useLocalData() {
  const [data, setData] = useState(loadData)

  useEffect(() => {
    saveData(data)
  }, [data])

  return [data, setData]
}
