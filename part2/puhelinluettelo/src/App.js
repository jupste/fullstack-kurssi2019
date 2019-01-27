import React, { useState, useEffect } from 'react'
import Person from './components/person'
import Filter from './components/filter'
import PersonForm from './components/personform'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [ search, setSearch] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.filter(p => p.name===newName).length>0){
      window.alert(`henkilö ${newName} on jo luettelossa`);
    }else{
      const personObject = {
        name: newName,
        number: newNumber
    }
    console.log(personObject)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const modifySearch = (event) => {
    setSearch(event.target.value)
  }
  const personsToShow = persons.filter(person =>person.name.toLowerCase().includes(search.toLowerCase()))
  console.log(persons)
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter search={search} modifySearch={modifySearch}/>
      <PersonForm addPerson= {addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numerot</h2>
      <Person persons={personsToShow}/>
    </div>
  )

}

export default App