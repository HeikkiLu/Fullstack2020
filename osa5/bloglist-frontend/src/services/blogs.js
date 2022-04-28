import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (title, author, url, user) => {
  const token = `bearer ${user.token}`
  const options = {
    headers: {
      'Authorization': token
    }
  }
  const request = axios.post(baseUrl, { title: title, author: author, url: url }, options)
  console.log(request.data)
  return request.data
}

export default { getAll, createBlog }
