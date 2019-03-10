import blogService from '../services/blogs'

const compare = (blog1, blog2) => {
  if (blog1.likes !== blog2.likes) {
    return blog2.likes - blog1.likes
  }
  return blog1.title > blog2.title
}
const blogReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT':
      return action.blogs.sort(compare)
    case 'CREATE':
      return state.concat(action.blog).sort(compare)
    case 'UPDATE':
      return state
        .map(blog => (blog._id === action.blog._id ? action.blog : blog))
        .sort(compare)
    case 'DELETE':
      return state.filter(blog => blog._id !== action.id).sort(compare)
    default:
      return state
  }
}
export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      blogs
    })
  }
}
export const createBlog = (title, author, url) => {
  return async dispatch => {
    const blog = await blogService.create({ title, author, url })
    dispatch({
      type: 'CREATE',
      blog
    })
    //initializeUsers()(dispatch)
  }
}
export default blogReducer
