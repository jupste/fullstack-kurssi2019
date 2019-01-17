import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }
  return (
    <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) =>{
    return (
        <div>
        <h1>{props.course}</h1>
        </div>
    )
}
const Content = (props) =>{
    const [one, two, three]=props.parts
    return (
    <div>
        <Part part={one.name} exercises={one.exercises}/>
        <Part part={two.name} exercises={two.exercises}/>
        <Part part={three.name} exercises={three.exercises}/>
    </div>
    )
}
const Part = (props) =>{
    return (
    <div>
    <p>
        {props.part} {props.exercises}
    </p>
    </div>
    )
}


const Total = (props) =>{
    const [one, two, three]=props.parts
    return (
        <div>
        <p>yhteensä {one.exercises+two.exercises+three.exercises} tehtävää</p>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))


