import axios from 'axios'

const TodoList = ({ tasks, reloading, setLoading }) => {

  const handleDelete = async (id) => {
    setLoading(true)
    await axios.delete(`/api/tasks/${id}`)

    reloading()

    setLoading(false)
  }

  const handleUpdate = async (id, completed) => {
    setLoading(true)
    await axios.put(`/api/tasks/${id}`, { completed: !completed })

    reloading()
    setLoading(false)
  }

  return (
    <>
      {tasks.map((task, index) => {
        return (
          <div
            className={`todo-list grid grid-flow-col gap-4 py-2 bg-white ${
              task.completed && 'bg-opacity-50'
            }`}
            key={task._id}>
            <div className={`ml-2 h-5 md:h-8 text-md md:text-xl ${task.completed && 'line-through'}`}>
              {task.description}
            </div>
            <div className="text-right">
              <button
                onClick={() => handleUpdate(task._id, task.completed)}
                disabled={task.completed}
                className={`px-2 md:px-3 bg-green-500 hover:bg-green-600 text-white h-full mr-1 ${
                  task.completed && 'disabled:bg-gray-500 cursor-default'
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-2 md:px-3 bg-red-600 hover:bg-red-700 text-white h-full mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TodoList
