import React from 'react'

const SinglePerson = ({ person }) => {
    return (
      <li>{person.name} {person.number}</li>
    )
  }

const Person = ({persons}) => {
  const rows = () => persons.map(person =>
    <SinglePerson
      key={person.name}
      person={person}
    />
  )
    return (
      <div>
      <ul>{rows()}</ul>
      </div>
    )
}

export default Person