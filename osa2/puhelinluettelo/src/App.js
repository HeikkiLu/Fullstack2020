import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Search from './components/SearchContact'
import ContactForm from './components/ContactForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const getPersons = () => {
    axios
    .get('http://localhost:3001/persons')
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
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} already exists in the phonebook!`)
    } else {
      setPersons(persons.concat(personObject))
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Contacts persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App