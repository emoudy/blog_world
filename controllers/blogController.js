// blog_blogs, blog_details, blog_create, blog_post, blog_delete
const Blog = require('../models/blogs');

const blog_blogs = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
  .then((result) => {
    res.render('blogs/blogs', { title: 'all blogs', blogs: result });
  })
  .catch((err) => {console.log(err)});
};

const blog_details = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Blog.findById(id)
    .then((result) => {
      res.render('blogs/details', { title: 'Blog Details', blog: result });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Oops, blog not found' });
    });
};

const blog_create = (req, res) => {
  res.render('blogs/create', { title: 'Create a blog' });
};

const blog_post = (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { blog_blogs, blog_details, blog_create, blog_post, blog_delete };