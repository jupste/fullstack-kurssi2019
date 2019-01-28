import React, { useState, useEffect } from 'react'
import Person from './components/person'
import Filter from './components/filter'
import PersonForm from './components/personform'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [ search, setSearch] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ notification, setNotification] = useState('')
  const [ errormessage, setError] = useState('')

  const editNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 4000);
  }
  const editError = (msg) => {
    setError(msg)
    setTimeout(() => {
      setError(null)
    }, 4000);
  }
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.filter(p => p.name===newName).length>0){
      const p= persons.find(person => person.name === newName)
      if(window.confirm(`henkilö ${newName} on jo luettelossa haluatko päivittää numeron?`)){
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
        .update(p.id, personObject)
        .then(person => {
          const newPersons = [...persons];
          newPersons.forEach(p => p.id === person.id ? p.number = person.number : 0);
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          editNotification(`henkilön ${newName} puhelinnumero päivitetty`)  
      }).catch(error => {
        editError(`henkilö '${newName}' on jo valitettavasti poistettu palvelimelta`);
      })
      }else{
        editNotification(`henkilön ${newName} puhelinnumeroa ei päivitetty`)
      }

    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
        .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        editNotification(`henkilö ${newName} lisätty`)
      })
      .catch(error => {
        editError(`henkilö '${newName}' on jo valitettavasti poistettu palvelimelta`);
      })
      
  }
  }
  const deleteEntry = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
    personService
      .deleteEntry(person).then(deletedPerson => {
        editNotification(`henkilö ${person.name} poistettiin`)
      })
      .catch(error => {
        editError(`henkilö '${person.name}' on jo valitettavasti poistettu palvelimelta`);
      })
      setPersons(persons.filter(p => p.id.toString() !== person.id.toString()))
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
  const rows = () => personsToShow.map(person =>
    <Person
      key={person.name}
      person={person}
      deleteEntry={() => deleteEntry(person.id)}
    />
  )
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <span className="error"> {errormessage}</span>
      <span className= "notification">{notification}</span>
      <Filter search={search} modifySearch={modifySearch}/>
      <PersonForm addPerson= {addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numerot</h2>
      <ul>{rows()}</ul>
    </div>
  )

}

export default App