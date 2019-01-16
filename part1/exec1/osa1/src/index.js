import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
        <Header course={course}/>
        <Content part1={part1} part2={part2} part3={part3} exec1={exercises1} exec2={exercises2} exec3={exercises3}/>
        <Total sum={exercises1 + exercises2 + exercises3} />
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
    return (
    <div>
        <Part part={props.part1} exercises={props.exec1}/>
        <Part part={props.part2} exercises={props.exec2}/>
        <Part part={props.part3} exercises={props.exec3}/>
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
    return (
        <div>
        <p>yhteensä {props.sum} tehtävää</p>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))


