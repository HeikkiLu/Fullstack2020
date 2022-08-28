import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  const options = {
    headers: {
      'Authorization': token
    }
  }
  const request = await axios.post(baseUrl, blog, options)
  return request.data
}

const updateBlog = async (id, blog) => {
  const options = {
    headers: {
      'Authorization': token
    }
  }
  const request = await axios.put(`${baseUrl}/${id}`, blog, options)
  return request.data
}

const deleteBlog = async (id) => {
  const options = {
    headers: {
      'Authorization': token
    }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, options)
  return request.data
}

export default { setToken, getAll, createBlog, updateBlog, deleteBlog }
