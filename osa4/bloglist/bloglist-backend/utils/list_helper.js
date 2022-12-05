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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
