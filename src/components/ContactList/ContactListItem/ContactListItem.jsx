import PropTypes from 'prop-types'
import css from './ContactListItem.module.css'
    const {button, li} = css

export default function ContactListItem(contact, deleteContact) {
    const { id, name, number } = contact;
    return(<li key={id} className={li}> {name} : {number}
        <button className={button} type="button" onClick={()=>{deleteContact(contact)}}>Delete</button>
    </li>)
}

ContactListItem.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string
    }).isRequired,
    deleteContact: PropTypes.func.isRequired
}