import { useEffect, useState } from 'react'
import TaskList from './components/TaskList'
import StatusMessage from './components/StatusMessage'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadTasks() {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        setTasks(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message ?? 'unknown error')
        }
      } finally {
        setLoading(false)
      }
    }

    loadTasks()

    return () => controller.abort()
  }, [])

  return (
    <main className="app">
      <header>
        <h1>研修 Day3 タスク一覧</h1>
        <p>FastAPI から固定データを fetch して表示しています。</p>
        <p className="api-url">
          API: <code>{API_BASE_URL}/tasks</code>
        </p>
      </header>

      {loading && <StatusMessage>読み込み中...</StatusMessage>}
      {error && (
        <StatusMessage variant="error">
          API 取得に失敗しました: {error}
        </StatusMessage>
      )}

      {!loading && !error && <TaskList tasks={tasks} />}
    </main>
  )
}

export default App
