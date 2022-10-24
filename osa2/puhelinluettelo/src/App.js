import { useState } from 'react'

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

const Person = ({person}) => (
  <p>{person.name} {person.number}</p>
)

const Persons = ({persons}) => (
  <div>
    {persons.map(person =>
        <Person key={person.name} person={person} />
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ]) 
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
        alert(`${newName} is already added to phonebook`)
        return
      }
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )

}

export default App
