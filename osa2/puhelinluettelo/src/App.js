import { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = ({value, onChange}) => (
  <div>filter shown with <input value={value} onChange={onChange}></input></div>
)

const PersonForm = ({onSubmit, nameValue, numberValue, onNameChange, onNumberChange}) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={nameValue} onChange={onNameChange}/></div>
    <div>number: <input value={numberValue} onChange={onNumberChange}/></div>
    <div><button type="submit">add</button></div>
  </form>
)

const Person = ({person, delPerson}) => (
  <div>
    {person.name} {person.number} <button onClick={() => delPerson(person.id)}>delete</button>
  </div>
)

const Persons = ({persons, delPerson}) => (
  <div>
    {persons.map(person =>
        <Person key={person.id} person={person} delPerson={delPerson}/>
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(notes => {
        setPersons(notes)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    for (const person of persons) {
      if (newName === person.name) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const changedPerson = { ...person, number: newNumber }
          personService
            .update(person.id, changedPerson)
            .then(responsePerson => {
              setPersons(persons.map(p => p.id !== responsePerson.id ? p : responsePerson))
              setNewName('')
              setNewNumber('')
            })
        }
        return
      }
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const delPerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} delPerson={delPerson}/>
    </div>
  )
}

export default App
