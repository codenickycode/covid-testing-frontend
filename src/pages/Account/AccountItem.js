import React, { useState } from 'react';

const AccountItem = ({ field, inputs, updates, setUpdates }) => {
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState({});

  const toggleEdit = () => setEdit(!edit);

  const handleChange = (e) => {
    setUpdates({ ...updates, [field]: true });
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div className='account-item'>
      <div className='account-item-top' onClick={toggleEdit}>
        <div className='account-item-text'>
          <h2>{field}</h2>
        </div>
        <button type='button'>{edit ? 'save' : 'edit'}</button>
      </div>
      {edit &&
        inputs.map((input, index) => {
          return (
            <input
              key={index}
              type={input.type}
              name={input.name}
              value={item[input.name]}
              onChange={handleChange}
            />
          );
        })}
    </div>
  );
};

export default AccountItem;
