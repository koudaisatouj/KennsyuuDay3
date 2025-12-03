function TaskCard({ task }) {
  return (
    <article className="task-card">
      <h2>
        {task.completed ? '✅' : '📝'} {task.title}
      </h2>
      <p>{task.description ?? '説明は登録されていません。'}</p>
      <small>ID: {task.id}</small>
    </article>
  )
}

export default TaskCard
