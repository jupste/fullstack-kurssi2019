const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.notification
    default:
      return state
  }
}

export const changeNotification = notification => {
  return {
    type: 'SET_MESSAGE',
    notification
  }
}

export default notificationReducer
