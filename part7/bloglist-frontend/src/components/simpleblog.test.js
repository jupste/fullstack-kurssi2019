import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import 'jest-dom/extend-expect'

describe('<SimpleBlog />', () => {
  let component
  let clicks = 0
  beforeEach(() => {
    clicks = 0
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      likes: 31
    }
    component = render(
      <SimpleBlog className="testBlog" blog={blog} onClick={() => clicks++} />
    )
  })
  it('renders its children', () => {
    component.container.querySelector('.testBlog')
  })
  it('renders title, author and likes', () => {
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('blog has 31 likes')
  })
  it('when button pressed twice it registeres two clicks', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(clicks).toBe(2)
  })
})
