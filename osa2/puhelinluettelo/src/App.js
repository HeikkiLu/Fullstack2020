import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Search from './components/SearchContact'
import ContactForm from './components/ContactForm'
import PersonService from './services/PersonService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({})

  const getPersons = () => {
    PersonService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(getPersons, [])

  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name === newName && e.number === newNumber)) {
      alert(`${newName} already exists in the phonebook!`)
    } else if (persons.some(e => e.name === newName && e.number != newNumber)) {
      let confirmation = window.confirm(`${newName} already exists in the phonebook, replace the old number with a new one?`)
      if (confirmation) {
        const person = persons.find(person => person.name === newName)
        PersonService.update(person.id, personObject)
        getPersons()
        handleNotification(`Updated ${newName}`, 'success')
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      PersonService.create(personObject)
      getPersons()
      handleNotification(`Added ${newName}`, 'success')
      setNewName('')
      setNewNumber('')

    }
  }


  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }
  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const hanleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  const handleDelete = (id, name) => {
    let confirmation = window.confirm(`Delete ${name} from phonebook?`)
    if (confirmation) {
      PersonService.remove(id).catch(error => {
        handleNotification(`${name} has been already removed`, 'error')
      })
      getPersons()
      handleNotification(`Removed ${name}`, 'success')
    }
  }
  const handleNotification = (message, type) => {
    setNotification({ msg: message, type: type })
    setTimeout(() => {
      setNotification({})
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.msg} type={notification.type} />
      <h2>Search person from phonebook</h2>
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Add new person to phonebook</h2>
      <ContactForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={hanleNumberChange}
      />
      <h2>Numbers</h2>
      <Contacts persons={persons} searchTerm={searchTerm} handleDelete={handleDelete} />
    </div>
  )
}

export default App