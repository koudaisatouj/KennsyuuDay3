import TaskCard from './TaskCard'

function TaskList({ tasks }) {
  if (!tasks.length) {
    return <p className="task-empty">表示できるタスクがありません。</p>
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  )
}

export default TaskList
