import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initialize } from './reducers/anecdoteReducer'

const App = props => {
  useEffect(() => {
    props.initialize()
  }, [])
  return (
    <div>
      <Notification />
      <h2>Filter anecdotes</h2>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default connect(
  null,
  { initialize }
)(App)
