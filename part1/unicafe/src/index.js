
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const handleGoodClick = () => {
        setGood(good + 1)
      }
    const handleBadClick = () => {
        setBad(bad + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }
    const total= good+neutral+bad
    const positive= ((good/(neutral+bad+good)*100).toString()).concat("%")
    const average= (good-bad)/total
    if(total===0){
    return (
    <div>
      <Header text="Anna palautetta"/>
      <Button handleClick={handleGoodClick} text="hyvä"/>
      <Button handleClick={handleNeutralClick} text="neutraali"/>
      <Button handleClick={handleBadClick} text="huono"/>
      <Header text="Statistiikkaa"/>
      <NoStats/>
    </div>
    )       
    }
    return (
    <div>
        <Header text="Anna palautetta"/>
        <Button handleClick={handleGoodClick} text="hyvä"/>
        <Button handleClick={handleNeutralClick} text="neutraali"/>
        <Button handleClick={handleBadClick} text="huono"/>
        <Header text="Statistiikkaa"/>
        <table>
        <tbody>
        <Statistic text="hyvää" stat={good}/>
        <Statistic text="neutraalia" stat= {neutral}/>
        <Statistic text="huonoa" stat= {bad}/>
        <Statistic text="yhteensä" stat= {total}/>
        <Statistic text="keskiarvo" stat={average}/>
        <Statistic text="positiivisia" stat={positive}/>
        </tbody>
        </table>
    </div>
  )
}


const Header = ({text}) =>{
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}
const NoStats = () =>{
    return (
        <div>
            <p>Ei yhtään annettua palautetta</p>
        </div>
    )
}
const Statistic =({text, stat}) =>(
    <tr>
     <td>{text}</td><td>{stat}</td> 
    </tr>
    )
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)