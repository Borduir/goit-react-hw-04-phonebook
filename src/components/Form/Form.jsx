import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './Form.module.css';

export default function Form({ checkIfContactExist }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const changeName = event => {
    setName(event.currentTarget.value);
  };

  const changeNumber = event => {
    setNumber(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    checkIfContactExist(name, number);
  };

  const { form, button, input } = css;
  return (
    <form className={form} onSubmit={handleSubmit}>
      <label>
        {' '}
        Name
        <input
          value={name}
          onChange={changeName}
          className={input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        {' '}
        Number
        <input
          value={number}
          onChange={changeNumber}
          className={input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={button} type="submit" onSubmit={handleSubmit}>
        Add contact
      </button>
    </form>
  );
}
Form.propTypes = {
  checkIfContactExist: PropTypes.func.isRequired,
};
