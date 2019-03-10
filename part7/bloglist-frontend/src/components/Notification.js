import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const error = {
    background: '#ff0000',
    color: '#000000',
    padding: 0
  }
  const notif = {
    background: '#98fb98',
    color: '#000000',
    padding: 0,
    marginbottom: 0
  }
  return <div style={notif}>{notification}</div>
}
const mapStateToProps = state => {
  return { notification: state.notification }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
