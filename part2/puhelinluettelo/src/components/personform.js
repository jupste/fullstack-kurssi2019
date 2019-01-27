import React from 'react'

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <div>
        <form onSubmit={addPerson}>
        <div>
        nimi: 
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>numero: <input value={newNumber} onChange={handleNumberChange}/></div>
          <button type="submit">tallenna</button>      
        </form>
        </div>
    )
}
    
export default PersonForm