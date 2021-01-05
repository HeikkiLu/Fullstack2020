import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticsLine = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = props => {
  
  const sum = props.good + props.neutral + props.bad

  if(sum === 0) return <p>No feedback given</p>
  
  const avg = ((props.good - props.bad) / sum).toFixed(2)
  const positive = ((props.good * 100) / sum).toFixed(2) + " %"
  return (
    <div>
        <table>
          <tbody>
            <StatisticsLine text="good" value={props.good}/>
            <StatisticsLine text="neutral" value={props.neutral}/>
            <StatisticsLine text="bad" value={props.bad}/>
            <StatisticsLine text="all" value={sum}/>
            <StatisticsLine text="average" value={avg}/>
            <StatisticsLine text="positive" value={positive}/>
          </tbody>
      </table>
    </div>
  )
}

const Button = props => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text={"good"}/>
      <Button onClick={increaseNeutral} text={"neutral"}/>
      <Button onClick={increaseBad} text={"bad"}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)