import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'
import 'jest-dom/extend-expect'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      user: '5c6c39ab53aaab39a202a999',
      likes: 31
    }
    component = render(
      <Blog
        className="testBlog"
        blog={blog}
        key={blog.id}
        addLike={() => console.log('add')}
        deleteBlog={() => console.log('delete')}
        renderDelete={true}
      />
    )
  })
  it('renders only basic info if blog is not selected', () => {
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).not.toHaveTextContent('testUrl')
    expect(component.container).not.toHaveTextContent('31')
  })
  it('renders all info in blog is selected', () => {
    const div = component.container.querySelector('.simple')
    fireEvent.click(div)
    expect(component.container).toHaveTextContent('testUrl')
    expect(component.container).toHaveTextContent('31')
    expect(component.container).toHaveTextContent('lisännyt')
  })
})
