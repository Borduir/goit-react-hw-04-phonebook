import { Fragment, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Form from './Form/Form';
import Filtre from './Filtre/Filtre';
import ContactList from './ContactList/ContactList';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filtre, setFiltre] = useState('');

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(localStorage.getItem('contacts')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkIfContactExist = (name, number) => {
    // перевіряємо чи є в стейті контакт з введеним ім'ям
    if (
      !contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      // якщо нема - перевіряємо чи є взагалі в локал сторідж якісь контакти
      if (localStorage.getItem('contacts')) {
        // якщо в локал сторідж є контакти - додаємо новий
        const localStorageContacts = JSON.parse(
          localStorage.getItem('contacts')
        );
        localStorageContacts.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        localStorage.setItem('contacts', JSON.stringify(localStorageContacts));
      } else {
        // якщо локал сторідж порожній - створюємо в локал сторідж перший контакт
        localStorage.setItem(
          'contacts',
          JSON.stringify([{ id: nanoid(), name: name, number: number }])
        );
      }
      // незалежно від того, було щось у локал сторіджі чи ні, оновлюємо стейт
      setContacts(JSON.parse(localStorage.contacts));
    }
    // якщо в стейті є контакт із введеним ім'ям - видаємо алєрт
    else {
      alert(`${name} is already in contacts.`);
    }
  };

  const filtreChange = event => {
    setFiltre(event.currentTarget.value);
  };

  const createFilteredList = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(`${filtre.toLowerCase()}`)
    );
  };

  const deleteContact = contact => {
    setContacts(contacts.filter(currentContact => currentContact !== contact));
  };
  return (
    <Fragment>
      <div>
        <h2>Phonebook</h2>
        <Form checkIfContactExist={checkIfContactExist} />
        <h2>Contacts</h2>
        <Filtre filtreChange={filtreChange} value={filtre} />
        <ContactList
          createFilteredList={createFilteredList}
          deleteContact={deleteContact}
        />
      </div>
    </Fragment>
  );
}
