import PropTypes from 'prop-types'
import css from './Filtre.module.css'

export default function Filtre({ filtreChange, value }) {
    return (
        <label className={css.label}> Search by name
            <input
                value={value}
                onChange={filtreChange}
                className={css.input}
                type="text"
                name="filtre"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
        </label>)
}

Filtre.propTypes = {
    filtreChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}