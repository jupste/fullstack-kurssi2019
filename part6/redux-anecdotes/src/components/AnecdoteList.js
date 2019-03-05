import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = props => {
  return (
    <ul>
      {props.anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={async () => {
            const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
            const response = await anecdoteService.update(votedAnecdote)
            props.changeNotification(`you voted '${anecdote.content}'`)
            props.vote(response)
            setTimeout(() => {
              props.changeNotification('')
            }, 3500)
          }}
        />
      ))}
    </ul>
  )
}
const mapStateToProps = state => {
  const filteredAnecdotes = state.anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(state.filter)
  )
  console.log(state.anecdotes)
  return {
    anecdotes: filteredAnecdotes,
    filter: state.filter
  }
}
const mapDispatchToProps = {
  vote,
  changeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
