const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((max, blog) =>
  blog.likes > max.likes ? { title: blog.title, author: blog.author, likes: blog.likes } : max,
  {likes: -1})
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    const max = {
      author: "",
      blogs: 0
    }
    blogCounts = {}
    blogs.forEach(blog => {
      author = blog.author
      if (!(author in blogCounts)) {
        blogCounts[author] = 0
      }
      blogCounts[author] += 1
      if (blogCounts[author] > max.blogs) {
        max.author = author
        max.blogs = blogCounts[author]
      }
    })
    return max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
