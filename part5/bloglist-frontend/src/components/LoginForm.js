import React from 'react'

const LoginForm = props => {
  const userName = props => {
    const { reset, ...usernameInput } = props.username
    return (
      <div>
        käyttäjätunnus
        <input name="Username" {...usernameInput} />
      </div>
    )
  }
  const passWord = props => {
    const { reset, ...passwordInput } = props.password
    return (
      <div>
        salasana
        <input name="password" {...passwordInput} />
      </div>
    )
  }

  return (
    <form onSubmit={props.handleLogin}>
      {userName(props)}
      {passWord(props)}
      <button type="submit">kirjaudu</button>
    </form>
  )
}
export default LoginForm
