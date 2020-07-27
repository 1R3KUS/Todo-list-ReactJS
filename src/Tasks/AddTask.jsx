import React, { useState } from 'react'
import Axios from 'axios'

function AddTask({ item, onAddTask }) {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleVis = () => {
    setVisible(!visible);
    setInputValue("");
  };

  const addTaskFoo = () => {
    const obj = {
      listId: item.id,
      text: inputValue,
    };
    Axios.post("http://localhost:3025/tasks", obj)
      .then(({ data }) => {
        onAddTask(item.id, data);
        toggleVis();
      })
      .catch(() => {
        alert("Ошибка при добавлении задачи!");
      });
  };

  return (
    <div className="addTask">
      {visible ? (
        <div className="addTask__button" onClick={toggleVis}>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10,2 C10.5522847,2 11,2.44771525 11,3 L11,9 L17,9 C17.5522847,9 18,9.44771525 18,10 C18,10.5522847 17.5522847,11 17,11 L11,11 L11,17 C11,17.5522847 10.5522847,18 10,18 C9.44771525,18 9,17.5522847 9,17 L9,11 L3,11 C2.44771525,11 2,10.5522847 2,10 C2,9.44771525 2.44771525,9 3,9 L9,9 L9,3 C9,2.44771525 9.44771525,2 10,2 Z"
              />
            </svg>
          </i>
          <span>New task</span>
        </div>
      ) : (
        <div className="addTask__items">
          <input
            type="text"
            placeholder="Enter name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="addButton" onClick={addTaskFoo}>
            Add task
          </button>
          <button className="addButton addButton_remove" onClick={toggleVis}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTask