import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>
  }
  else {
    let all = good + neutral + bad
    let sum = good - bad

    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={(sum / all).toFixed(1)} />
            <StatisticLine text="positive" value={(good / all * 100).toFixed(1) + " %"} />
          </tbody>
        </table>
      </div>
    )
  }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
