import React from 'react'

const reducer = (accumulator, obj) => accumulator + obj.exercises;

const SingleCourse = ({course}) => {
  const rows = () => course.parts.map(part =>
    <SinglePart
      key={part.id}
      part={part}
    />
  )
    return (
      <div>
      <h1>{course.name}</h1>
      <ul>{rows()}</ul>
      <p>yhteensä: {course.parts.reduce(reducer, 0)}</p>
      </div>
    )
}

const SinglePart = ({ part }) => {
    return (
      <li>{part.name} {part.exercises}</li>
    )
  }

const Course = ({ courses }) => {
  const rows = () => courses.map(course =>
    <SingleCourse
      key={course.id}
      course={course}
    />
  )  
  return (
    <div>
        <ul>{rows()}</ul>        
    </div>
  )
}

export default Course