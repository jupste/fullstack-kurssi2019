const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes
test('dummy method works', () => {
  const dummyVariable = dummy([1, 2, 3])
  expect(dummyVariable).toBe(1)
})

describe('total likes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 20,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 6,
      __v: 0
    }
  ]
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const emptyList = []
  test('empty list gives zero', () => {
    const result = totalLikes(emptyList)
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('bigger list is calculated right', () => {
    const result = totalLikes(blogs)
    expect(result).toBe(31)
  })
  test('favorite method returns blog with most likes', () => {
    const result = favoriteBlog(blogs)
    expect(result.title).toEqual('React patterns')
  })
  test('method can find author with most blogs', () => {
    const result = mostBlogs(blogs)
    expect(result.author).toEqual('Edsger W. Dijkstra')
    expect(result.blogs).toEqual(2)
  })
  test('method can find author with most likes', () => {
    const result = mostLikes(blogs)
    //expect(result.author).toEqual('Michael Chan')
    expect(result.likes).toEqual(20)
  })
})
