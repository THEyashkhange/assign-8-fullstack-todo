import React, { useEffect, useState } from "react";
import axios from "axios";

// change after Render deploy
const API_URL = "http://localhost:5000/api/tasks";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTasks(res.data);
      setLoading(false);
    } catch {
      setError("Failed to load tasks");
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(API_URL, { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`${API_URL}/${task._id}`, {
      completed: !task.completed
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>

      <div className="input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              className={task.completed ? "done" : ""}
              onClick={() => toggleTask(task)}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
