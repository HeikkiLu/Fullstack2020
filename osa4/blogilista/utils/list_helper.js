
const dummy = blogs => {
  return 1
}

const getTotalLikes = blogs => {
  let total = 0
  blogs.forEach(blog => total += blog.likes)
  return total
}

const getFavourite = blogs => {
  let favouriteBlog
  blogs.forEach(blog => {
    if(!favouriteBlog) favouriteBlog = blog
    if(blog.likes > favouriteBlog.likes) {
      favouriteBlog = blog
    }
  })
  return favouriteBlog
}

module.exports = {
  dummy,
  getTotalLikes,
  getFavourite
}
