const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.notification
    default:
      return state
  }
}
const dispatcher = notification => {
  return {
    type: 'SET_MESSAGE',
    notification
  }
}
export const changeNotification = notification => {
  return async dispatch => {
    dispatch(dispatcher(notification))
    setTimeout(() => {
      dispatch(dispatcher(''))
    }, 3000)
  }
}

export default notificationReducer
