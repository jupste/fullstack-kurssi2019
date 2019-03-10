import React from 'react'

const LoginForm = props => {
  const userName = props => {
    const { reset, ...usernameInput } = props.username
    return <input name="username" id="Username" {...usernameInput} />
  }
  const passWord = props => {
    const { reset, ...passwordInput } = props.password
    return <input name="password" id="Password" {...passwordInput} />
  }

  return (
    <form onSubmit={props.handleLogin}>
      käyttäjätunnus {userName(props)}
      salasana {passWord(props)}
      <button type="submit">kirjaudu</button>
    </form>
  )
}
export default LoginForm
