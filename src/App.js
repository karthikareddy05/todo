import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // 🔹 LOAD tasks from localStorage (runs once)
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // 🔹 SAVE tasks to localStorage (runs when tasks change)
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }

    setInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <hr />

      <input
        type="text"
        placeholder="add item . . ."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="add-btn" onClick={addTask}>
        {editIndex !== null ? "UPDATE" : "ADD"}
      </button>

      <div className="list">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <div className="left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <span className={task.completed ? "done" : ""}>
                {task.text}
              </span>
            </div>

            <div>
              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button
                className="edit-btn"
                onClick={() => editTask(index)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
