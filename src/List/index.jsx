import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Badge from "../Badge";

import "./List.scss";
import Axios from "axios";

function List({ items, removable, activeItem, onRemove }) {

  const deleteList = id => {
    if(window.confirm('Do you really want to delete the list')) {
      Axios.delete("http://localhost:3025/lists/" + id).then(() =>{
        onRemove(id)
      })
    }
  }



  const list = items.map((item, index) => (
    <Link
      to={`/tasks/${item.id ? item.id : ""}`}
      key={index}
      className={classNames(item.className, {
        active: item.active
          ? item.active
          : activeItem && activeItem.id === item.id,
      })}
    >
      <i className="list__badge">
        {item.icon ? item.icon : <Badge color={item.color.name} />}
      </i>
      <span>{item.name}</span>
      {removable && (
        <i className="removeIcon" onClick={() => deleteList(item.id)}>
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
      )}
    </Link>
  ));

  return <ul className="list">{list}</ul>;
}

export default List;
