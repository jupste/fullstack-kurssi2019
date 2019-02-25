import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const userName = useField('text')
  const passWord = useField('')
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
      setErrorMessage('väärä käyttäjätunnus tai salasana')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3500)
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
    setNotificationMessage(
      `lisätty tekijän ${author.value} blogi "${title.value}"`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3500)
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
  const errorBar = () => <span className="error">{errorMessage}</span>
  const notificationBar = () => (
    <span className="notification">{notificationMessage}</span>
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
          setNotificationMessage(`blogi ${blog.title} poistettiin`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3500)
        })
        .catch(error => {
          setErrorMessage(
            `blogi '${blog.title}' on jo valitettavasti poistettu palvelimelta`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3500)
        })
      setBlogs(
        blogs.filter(p => p.id.toString() !== blog.id.toString()).sort(compare)
      )
    }
    blogs.sort(compare)
  }
  return (
    <div>
      {errorBar()}
      {notificationBar()}
      {user === null ? (
        <LoginForm
          className="login"
          username={userName}
          password={passWord}
          setPassword={passWord.onChange}
          setUsername={userName.onChange}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>{user.name} kirjautunut</p>
          {loggoutButton()}
          {blogForm()}
          <h2>blogs</h2>
          <div className="blogs">
            {blogs.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={() => addLike(blog.id)}
                deleteBlog={() => deleteBlog(blog.id)}
                renderDelete={user.username === blog.user.username}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
