import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Route, useLocation} from "react-router-dom";

import List from "./List";
import Task from "./Tasks";
import AddList from "./AddList";

function App() {

  const [lists, setLists] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [colors, setColors] = useState(null);
  let location = useLocation()

  const itemsForList = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3,14 C3.55228475,14 4,14.4477153 4,15 C4,15.5522847 3.55228475,16 3,16 C2.44771525,16 2,15.5522847 2,15 C2,14.4477153 2.44771525,14 3,14 Z M17,14 C17.5522847,14 18,14.4477153 18,15 C18,15.5522847 17.5522847,16 17,16 L7,16 C6.44771525,16 6,15.5522847 6,15 C6,14.4477153 6.44771525,14 7,14 L17,14 Z M3,9 C3.55228475,9 4,9.44771525 4,10 C4,10.5522847 3.55228475,11 3,11 C2.44771525,11 2,10.5522847 2,10 C2,9.44771525 2.44771525,9 3,9 Z M17,9 C17.5522847,9 18,9.44771525 18,10 C18,10.5522847 17.5522847,11 17,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.44771525 6.44771525,9 7,9 L17,9 Z M3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 Z M17,4 C17.5522847,4 18,4.44771525 18,5 C18,5.55228475 17.5522847,6 17,6 L7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 L17,4 Z"
          />
        </svg>
      ),
      name: "All tasks"
    },
  ]

  const onAddList = (obj) => {
    const newList = [...lists, obj]; 
    setLists(newList);
  }

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const removeTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')){
      
    const newList = lists.map(item => {
      if(item.id === listId){
        item.tasks = item.tasks.filter(task => task.id !== taskId)
      }
      return item
    })
    setLists(newList);
      Axios.delete("http://localhost:3025/tasks/" + taskId).catch(() => {
        alert("Не удалось удалить задачу");
      });
    }
  }


  useEffect(() => {
    const listId = location.pathname.split("tasks/")[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveItem(list);
    }
}, [lists, location.pathname]);



  useEffect(() => {
    Axios
      .get("http://localhost:3025/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
          setLists(data);
        });

    Axios.get("http://localhost:3025/colors").then(({ data }) => setColors(data));
  }, []);
  

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={itemsForList} />
        {lists ? (
          <List
            items={lists}
            activeItem={activeItem}
            removable
            onRemove={(id) => {
              const newLists = lists.filter((item) => item.id !== id);
              setLists(newLists);
            }}
          />
        ) : (
          "Загрузка..."
        )}
        <AddList colors={colors} onAddList={onAddList} />
      </div>
      <div className="todo__tasks">
        <Route path="/tasks/:id">
          {lists && activeItem && (
            <Task
              list={activeItem}
              removeTask={removeTask}
              onAddTask={onAddTask}
            />
          )}
        </Route>
        <Route exact path="/tasks/">
          {lists &&
            lists.map((items) => (
              <Task
                key={items.id}
                list={items}
                removeTask={removeTask}
                onAddTask={onAddTask}
              />
            ))}
        </Route>
      </div>
    </div>
  );
}

export default App;
