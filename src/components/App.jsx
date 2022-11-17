import React, { Component, Fragment } from 'react';
import { nanoid } from 'nanoid'

import Form from './Form/Form'
import Filtre from './Filtre/Filtre'
import ContactList from './ContactList/ContactList'
export class App extends Component {
  state = {
    contacts: [],
    filtre: '',
  }

  componentDidMount() {
    if (localStorage.getItem('contacts')){
    this.setState({contacts: JSON.parse(localStorage.getItem('contacts'))})}
  }

  componentDidUpdate(_, prevState) {
    const {contacts} = this.state
    if (prevState.contacts !== contacts){
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  }

  filtreChange = (event) => {
            const { name, value } = event.currentTarget
    this.setState({ [name]: value })
    }

  checkIfContactExist = (name, number) => {
    const { contacts } = this.state
    // перевіряємо чи є в стейті контакт з введеним ім'ям
    if (!contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      // якщо нема - перевіряємо чи є взагалі в локал сторідж якісь контакти
      if (localStorage.getItem('contacts')) {
        // якщо в локал сторідж є контакти - додаємо новий
        const localStorageContacts = JSON.parse(localStorage.getItem('contacts'))
        localStorageContacts.push({ id: nanoid(), name: name, number: number })
        localStorage.setItem('contacts', JSON.stringify(localStorageContacts))
      }
      else {
        // якщо локал сторідж порожній - створюємо в локал сторідж перший контакт
        localStorage.setItem('contacts', JSON.stringify([{ id: nanoid(), name: name, number: number }]))
      }
      // незалежно від того, було щось у локал сторіджі чи ні, оновлюємо стейт
      this.setState({ contacts: JSON.parse(localStorage.contacts) })
    }
    // якщо в стейті є контакт із введеним ім'ям - видаємо алєрт 
    else {alert(`${name} is already in contacts.`)}
  }

  createFilteredList = () => {
    const {contacts, filtre} = this.state
    return contacts.filter(contact => contact.name.toLowerCase().includes(`${filtre.toLowerCase()}`))    
  }

  deleteContact = (contact) => {
    const {contacts} = this.state 
    this.setState({ contacts: contacts.filter(currentContact => currentContact !== contact) })
  }

  render() {
    return (
      <Fragment>
        <div>
          <h2>Phonebook</h2>
          <Form checkIfContactExist={this.checkIfContactExist} />
          <h2>Contacts</h2>
          <Filtre filtreChange={this.filtreChange} value={this.state.filtre} />
          <ContactList createFilteredList={this.createFilteredList} deleteContact={this.deleteContact} />
      </div>
      </Fragment>
  );
}
};
