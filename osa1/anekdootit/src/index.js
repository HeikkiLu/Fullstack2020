import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => <button onClick={props.clickHandle}>{props.text}</button>
const Votes = props => <p>has {props.voteCount} votes</p>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const handleNextClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVoteClick = () => {
    const castedVote = [...votes]
    castedVote[selected] += 1
    setVotes(castedVote)

    if(castedVote[selected] > castedVote[mostVotes]) setMostVotes(selected)
    
  } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <Votes voteCount={votes[selected]}/>
      <div>
      <Button clickHandle={handleVoteClick} text="vote" />
      <Button clickHandle={handleNextClick} text="next anecdote" />
      </div>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotes]}
      <Votes voteCount={votes[mostVotes]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)