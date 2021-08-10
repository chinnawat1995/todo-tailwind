import axios from 'axios';
import { useState } from 'react';

const TodoList = ({ tasks, reloading }) => {
  const [show, setShow] = useState([]);

  const handleShow = (index) => {
    setShow(index);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/tasks/${id}`);

    reloading();
  };

  const handleUpdate = async (id, completed) => {
    await axios.put(`/api/tasks/${id}`, { completed: !completed });

    reloading();
  };

  return (
    <>
      {tasks.map((task, index) => {
        return (
          <div
            onClick={() => handleShow(index)}
            className="todo-list grid-cols-3 gap-4 py-2 bg-white border-2 border-blue-50 cursor-pointer"
            key={task._id}>
            <div className={`ml-2 col-span-2 h-8 text-xl ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </div>
            <div className={`col-span-1 text-right ${show === index ? '' : 'hidden'}`}>
              <button
                onClick={() => handleUpdate(task._id, task.completed)}
                className="px-3 bg-green-500 hover:bg-green-600 text-white h-full mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                className="px-3 bg-red-600 hover:bg-red-700 text-white h-full mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
        );
      })}
    </>
  );
};

export default TodoList;
