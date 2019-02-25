import App from './App'
import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'

jest.mock('./services/blogs')

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(() => component.getByText('kirjaudu'))
    expect(component.container).toHaveTextContent('käyttäjätunnus')
    expect(component.container).toHaveTextContent('salasana')
    expect(component.container.querySelector('.blogs')).toBeNull()
  })
  it('if user is logged in app shows all blogs', async () => {
    const user = {
      username: 'testeri',
      token: '123456789',
      name: 'Testi Pasi'
    }
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(() => component.getByText('kirjaudu'))

    expect(component.container.querySelector('.blogs').length).not.toBe(0)
    expect(component.container.querySelector('.blogs')).toHaveTextContent(
      'React patterns'
    )
  })
})
