import React from 'react';
import s from './Dropdown.css';


const Dropdown = (props) => {
  const handlerSelect= (event) => {props.onChange(event.target.value)};
  return (
      <div className={s.dropdown}>
          {props.optionList && (
            <select
              className={s.customSelect}
              onChange={handlerSelect}
            >
              {
              props.optionList.map(item => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))
            }
            </select>
          )}
      </div>
  );
}

export default Dropdown;
