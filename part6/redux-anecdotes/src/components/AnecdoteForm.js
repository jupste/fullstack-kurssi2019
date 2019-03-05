import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const addNew = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.createAnecdote(content)
    props.changeNotification(`you created a new anecdote: '${content}'`)

    setTimeout(() => {
      props.changeNotification('')
    }, 3500)
  }
  return (
    <form onSubmit={addNew}>
      <div>
        <input name="content" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}
const mapDispatchToProps = {
  createAnecdote,
  changeNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
