import React from 'react'

const Contacts = ({ persons, searchTerm }) => {
    let listOfPersons = []
    if (searchTerm === '') {
        listOfPersons = persons.concat()
        return <Person persons={persons} />
    } else {
        persons.forEach(person => {
            if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) listOfPersons.push(person)
        })
    }
    return <Person persons={listOfPersons} />
}

const Person = (props) => {
    return (
        <div>
            { props.persons.map((person) => {
                return (
                    <div key={person.name}>{person.name} {person.number}</div>
                )
            })
            }
        </div>
    )
}

export default Contacts