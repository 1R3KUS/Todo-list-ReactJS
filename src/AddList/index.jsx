import React, { useState, useEffect } from 'react'

import Axios from 'axios'

import './AddList.scss'
import Badge from '../Badge'

function AddList({ colors, onAddList }) {

  const [visible, setVisible] = useState(false)
  const [AddListValue, setAddListValue] = useState('')
  const [seletedColor, selectColor] = useState(1);
  const [isLoading, setIsLoading] = useState(true);


  const close = () => {
    setAddListValue('')
    setVisible(false)
    selectColor(1)
  }

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onAdd = () => {
    if (!AddListValue) {
      alert('Введите название списка');
      return;
    }
    setIsLoading(true);
    Axios
      .post('http://localhost:3025/lists', {
        name: AddListValue,
        colorId: seletedColor
      })
      .then(({ data }) => {
        const color = colors.filter(c => c.id === seletedColor)[0].name;
        const listObj = { ...data, color: { name: color } };
        onAddList(listObj);
        close();
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи!')
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="addList">
        <div className="addList__button" onClick={() => setVisible(true)}>
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
          <span>Add list</span>
        </div>
        {visible &&
        <div className="addList__item">
          <i className="addList__item_closeBtn" onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M13.707,12.293 C14.098,12.684 14.098,13.316 13.707,13.707 C13.512,13.902 13.256,14 13,14 C12.744,14 12.488,13.902 12.293,13.707 L10,11.414 L7.707,13.707 C7.512,13.902 7.256,14 7,14 C6.744,14 6.488,13.902 6.293,13.707 C5.902,13.316 5.902,12.684 6.293,12.293 L8.586,10 L6.293,7.707 C5.902,7.316 5.902,6.684 6.293,6.293 C6.684,5.902 7.316,5.902 7.707,6.293 L10,8.586 L12.293,6.293 C12.684,5.902 13.316,5.902 13.707,6.293 C14.098,6.684 14.098,7.316 13.707,7.707 L11.414,10 L13.707,12.293 Z M10,2 C5.582,2 2,5.582 2,10 C2,14.418 5.582,18 10,18 C14.418,18 18,14.418 18,10 C18,5.582 14.418,2 10,2 L10,2 Z"
              />
            </svg>
          </i>
          <input
            type="text"
            placeholder="Enter name"
            value={AddListValue}
            onChange={(e) => setAddListValue(e.target.value)}
          />
          <div className="badgeItems">
            {colors &&
              colors.map((color, index) => (
                <Badge
                  key={color.id}
                  onClick={() => {selectColor(color.id)}}
                  color={color.name}
                  className={seletedColor === color.id && 'active'}
                />
              ))}
          </div>
          <button className="addButton" onClick={onAdd}>{isLoading ? 'Adding...' : 'Add' }</button>
        </div>
      }
    </div>
  );
}


export default AddList