import React from 'react'

import './Tasks.scss'
import AddTask from './AddTask'

function Tasks({ list, onAddTask, removeTask }) {
  return (
    <div className="tasks">
      <div className="tasks__title">
        <h1 style={{ color: list.color.hex }}>{list.name}</h1>
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M17,16 C17.5522847,16 18,16.4477153 18,17 C18,17.5522847 17.5522847,18 17,18 L3,18 C2.44771525,18 2,17.5522847 2,17 C2,16.4477153 2.44771525,16 3,16 L17,16 Z M6.29289322,9.29289322 L13.2928932,2.29289322 C13.6533772,1.93240926 14.2206082,1.90467972 14.6128994,2.20970461 L14.7071068,2.29289322 L17.7071068,5.29289322 C18.0675907,5.65337718 18.0953203,6.22060824 17.7902954,6.61289944 L17.7071068,6.70710678 L10.7071068,13.7071068 C10.5508265,13.8633871 10.3481451,13.9625983 10.131444,13.9913276 L10,14 L7,14 C6.48716416,14 6.06449284,13.6139598 6.00672773,13.1166211 L6,13 L6,10 C6,9.77898626 6.07316447,9.56551597 6.20608063,9.39197049 L6.29289322,9.29289322 L13.2928932,2.29289322 L6.29289322,9.29289322 Z M14,4.41421356 L8,10.4142136 L8,12 L9.58578644,12 L15.5857864,6 L14,4.41421356 Z"
            />
          </svg>
        </i>
      </div>
      <div className="tasks__item">
        {list.tasks &&
          list.tasks.map((item) => (
            <div key={item.id} className="task">
              <p>{item.text}</p>
              <i onClick={() => removeTask(list.id, item.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M15,8 C15.5522847,8 16,8.44771525 16,9 L16,15 C16,16.6568542 14.6568542,18 13,18 L7,18 C5.34314575,18 4,16.6568542 4,15 L4,9 C4,8.44771525 4.44771525,8 5,8 L15,8 Z M14,10 L6,10 L6,15 C6,15.5522847 6.44771525,16 7,16 L13,16 C13.5522847,16 14,15.5522847 14,15 L14,10 Z M7,3 C7,2.44771525 7.44771525,2 8,2 L12,2 C12.5522847,2 13,2.44771525 13,3 L13,4 L16,4 C16.5522847,4 17,4.44771525 17,5 C17,5.55228475 16.5522847,6 16,6 L4,6 C3.44771525,6 3,5.55228475 3,5 C3,4.44771525 3.44771525,4 4,4 L7,4 L7,3 Z"
                  />
                </svg>
              </i>
            </div>
          ))}
      </div>
      <AddTask item={list} onAddTask={onAddTask} />
    </div>
  );
}

export default Tasks
