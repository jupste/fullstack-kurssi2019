import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const compare = (anecdoteA, anecdoteB) => {
  if (anecdoteA.votes !== anecdoteB.votes) {
    return anecdoteB.votes - anecdoteA.votes
  }
  return anecdoteB.content > anecdoteA.content
}
const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const votesToChange = state.find(n => n.id === id)
      const changedObject = {
        ...votesToChange,
        votes: votesToChange.votes + 1
      }
      return state
        .map(anecdote => (anecdote.id !== id ? anecdote : changedObject))
        .sort(compare)
    case 'INIT':
      return action.data
    default:
      return state
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}
export const vote = anecdote => {
  return async dispatch => {
    const updated = {
      id: anecdote.id,
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    console.log(updated)
    await anecdoteService.update(updated)
    dispatch({
      type: 'VOTE',
      data: updated
    })
  }
}
export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}
export default reducer
