import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (input === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, input]);
    }

    setInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setInput(tasks[index]);
    setEditIndex(index);
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
            <span>{task}</span>
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
