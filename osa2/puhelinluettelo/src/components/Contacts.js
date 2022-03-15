import React from 'react'

const Contacts = ({ persons, searchTerm, handleDelete }) => {
    let listOfPersons = []
    if (searchTerm === '') {
        listOfPersons = persons.concat()
        //return <Person persons={persons} />
    } else {
        persons.forEach(person => {
            if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) listOfPersons.push(person)
        })
    }
    return (
        <div>
            {
                listOfPersons.map((person, i) =>
                    <Person key={i} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id, person.name)} />
                )
            }
        </div>
    )
}

const Person = (props) => {
    return (
        <div>
            {props.name} {props.number}  <button onClick={props.handleDelete}>Delete</button>
        </div>
    )
}

export default Contacts