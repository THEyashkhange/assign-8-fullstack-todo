import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://todo-backend-d5mp.onrender.com/api/tasks";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load tasks");
      setLoading(false);
    }
  };

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post(API_URL, { title });
    setTitle("");
    fetchTasks();
  };

  // Toggle complete / incomplete
  const toggleTask = async (task) => {
    await axios.put(`${API_URL}/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  // Update task title
  const updateTask = async (id) => {
    if (!editTitle.trim()) return;

    await axios.put(`${API_URL}/${id}`, {
      title: editTitle,
    });
    setEditId(null);
    setEditTitle("");
    fetchTasks();
  };

  // Search filter
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>To-Do List</h2>

      {/* Add Task */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Search */}
      <input
        className="search"
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Task List */}
      {filteredTasks.map((task) => (
        <div className="task" key={task._id}>
          <div className="left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />

            {editId === task._id ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>
            )}
          </div>

          <div className="buttons">
            {editId === task._id ? (
              <button onClick={() => updateTask(task._id)}>Save</button>
            ) : (
              <button
                onClick={() => {
                  setEditId(task._id);
                  setEditTitle(task.title);
                }}
              >
                Edit
              </button>
            )}
            <button className="delete" onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
