import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'
import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})
const store = createStore(reducer, applyMiddleware(thunk))
anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(a => {
    store.dispatch({ type: 'NEW', data: a })
  })
)
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      {' '}
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
