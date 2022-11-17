import ContactListItem from './ContactListItem/ContactListItem'
import PropTypes from 'prop-types'

import css from './ContactList.module.css'

export default function ContactList({ createFilteredList, deleteContact }) {
  return (
    <ul className={css.list}> 
    {createFilteredList().map(contact => {
      return (ContactListItem(contact, deleteContact))
    })}
    </ul>
    )
}
  
ContactList.propTypes = {
  createFilteredList: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired
}