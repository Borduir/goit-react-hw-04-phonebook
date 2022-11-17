import React, { Component } from 'react';
import PropTypes from 'prop-types'

import css from './Form.module.css'

export default class Form extends Component {
    state = {
        name: '',
        number: '',
    }
    handleChange = (event) => {
            const { name, value } = event.currentTarget
            this.setState({ [name]: value })
    }
     handleSubmit = event => {
         event.preventDefault();
         this.props.checkIfContactExist(this.state.name, this.state.number)
    
        }
    render() {
        const { name, number } = this.state
        const { handleSubmit, handleChange } = this
        const {form, button, input} = css
        return (
            <form className={form} onSubmit={handleSubmit}>
                <label> Name
                    <input
                        value={name}
                        onChange={handleChange}
                        className={input}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </label>
                <label> Number
                    <input
                        value={number}
                        onChange={handleChange}
                        className={input}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
                <button className={button} type="submit" onSubmit={handleSubmit}>Add contact</button>
            </form>
        )
    }
}
Form.propTypes = {
  checkIfContactExist: PropTypes.func.isRequired
}