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

const mostBlogs = blogs => {
  let blogger = {
    author: '',
    blogs: 0
  }

  let bloggerMap = new Map()

  blogs.forEach(blog => {
    if(bloggerMap.has(blog.author)) {
      let count = bloggerMap.get(blog.author)
      count++
      bloggerMap.set(blog.author, count)
    } else {
      bloggerMap.set(blog.author, 1)
    }

    if(bloggerMap.get(blog.author) > blogger.blogs) {
      blogger.author = blog.author
      blogger.blogs = bloggerMap.get(blog.author)
    }

  })

  return blogger.author === 0 ? null :  blogger

}

const mostLikes = blogs => {
  let blogger = {
    author: '',
    likes: 0
  }
  let bloggerMap = new Map()
  blogs.forEach(blog => {
    if (bloggerMap.has(blog.author)) {
      let count = bloggerMap.get(blog.author)
      count += blog.likes
      bloggerMap.set(blog.author, count)
    } else {
      bloggerMap.set(blog.author, blog.likes)
    }
    if (bloggerMap.get(blog.author) > blogger.likes) {
      blogger.author = blog.author
      blogger.likes = bloggerMap.get(blog.author)
    }
  })
  return blogger.author === '' ? null : blogger
}


module.exports = {
  dummy,
  getTotalLikes,
  getFavourite,
  mostBlogs,
  mostLikes
}
