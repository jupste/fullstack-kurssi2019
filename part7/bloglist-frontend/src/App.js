import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import User from './components/User'
import BlogList from './components/BlogList'
import Users from './components/Users'
import { useField } from './hooks'
import Notification from './components/Notification'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { changeNotification } from './reducers/notificationReducer'
const App = props => {
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const userName = useField('text')
  const passWord = useField('password')
  const [user, setUser] = useState(null)

  const compare = (blog1, blog2) => {
    if (blog1.likes !== blog2.likes) {
      return blog2.likes - blog1.likes
    }
    return blog1.title > blog2.title
  }
  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs.sort(compare))
    })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (JSON.parse(loggedUserJSON) !== null) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    const username = userName.value
    const password = passWord.value
    try {
      const loggedUser = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      userName.reset()
      passWord.reset()
    } catch (exception) {
      props.changeNotification('väärä käyttäjätunnus tai salasana')
    }
  }
  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.setItem('loggedBlogappUser', null)
  }
  const loggoutButton = () => <button onClick={logout}>logout</button>

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog).sort(compare))
      title.reset()
      author.reset()
      url.reset()
    })
    props.changeNotification(
      `lisätty tekijän ${author.value} blogi "${title.value}"`
    )
  }
  const { reset, ...inputAuthor } = author
  const blogForm = () => (
    <Togglable buttonLabel="lisää uusi">
      <h2>lisää uusi</h2>
      <form onSubmit={addBlog}>
        title
        <input
          type={title.type}
          value={title.value}
          onChange={title.onChange}
        />
        <br />
        author <input {...inputAuthor} />
        <br />
        url
        <input type={url.type} value={url.value} onChange={url.onChange} />
        <br />
        <button type="submit">tallenna</button>
      </form>
    </Togglable>
  )

  const addLike = id => {
    const blog = blogs.find(n => n.id === id)
    const newBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(blog.id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => (b.id !== id ? b : returnedBlog)).sort(compare))
      })
      .catch(error => setBlogs(blogs.filter(n => n.id !== id)))
    blogs.sort(compare)
  }

  const deleteBlog = id => {
    const blog = blogs.find(n => n.id === id)
    if (window.confirm(`Poistetaanko ${blog.title}?`)) {
      blogService
        .deleteEntry(blog)
        .then(deletedBlog => {
          props.changeNotification(`blogi ${blog.title} poistettiin`)
          setTimeout(() => {
            props.changeNotification('')
          }, 3500)
        })
        .catch(error => {
          props.changeNotification(
            `blogi '${blog.title}' on jo valitettavasti poistettu palvelimelta`
          )
        })
      setBlogs(
        blogs.filter(p => p.id.toString() !== blog.id.toString()).sort(compare)
      )
    }
    blogs.sort(compare)
  }
  return (
    <Router>
      <div class="container">
        <Menu />
        <Route
          exact
          path="/"
          render={() => (
            <div class="container">
              <Notification />
              <h1 class="container">BlogApp</h1>
              <div class="container">
                {user === null ? (
                  <LoginForm
                    className="login"
                    username={userName}
                    password={passWord}
                    handleLogin={handleLogin}
                  />
                ) : (
                  <div>
                    <p>{user.name} kirjautunut</p>
                    {loggoutButton()}
                    {blogForm()}
                    <h2>blogs</h2>
                    <div className="blogs">
                      <BlogList blogs={blogs} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => (
            <Blog
              blogId={match.params.id}
              user={user}
              addLike={addLike}
              deleteBlog={deleteBlog}
              renderDelete={true}
            />
          )}
        />
        <Route exact path="/users" render={() => <Users />} />
        <Route
          exact
          path="/users/:id"
          render={({ match }) => <User userId={match.params.id} />}
        />
      </div>
    </Router>
  )
}

export default connect(
  null,
  { changeNotification }
)(App)
