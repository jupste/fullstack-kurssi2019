const dummy = blogs => {
  return 1
}
const getAuthors = blogs => {
  const authors = {}
  blogs.forEach(blog => {
    if (blog.author in authors) {
      authors[blog.author]++
    } else {
      authors[blog.author] = 1
    }
  })
  return authors
}
const getLikes = blogs => {
  const authors = {}
  blogs.forEach(blog => {
    if (blog.author in authors) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  })
  return authors
}
const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  }
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}
const favoriteBlog = blogs => {
  let favorite = blogs[0]
  let maxLikes = 0
  for (var i in blogs) {
    if (blogs[i].likes > maxLikes) {
      favorite = blogs[i]
      maxLikes = blogs[i].likes
    }
  }
  return favorite
}
const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null
  }
  const authors = getAuthors(blogs)
  let best = {
    author: null,
    blogs: 0
  }
  for (var author in authors) {
    if (authors[author] > best['blogs']) {
      best['author'] = author
      best['blogs'] = authors[author]
    }
  }
  return best
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return null
  }
  const authors = getLikes(blogs)
  let best = {
    author: null,
    likes: 0
  }

  for (var author in authors) {
    if (authors[author] > best['likes']) {
      best['author'] = author
      best['likes'] = authors[author]
    }
  }
  return best
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
