const express = require('express');
const Blog = require('../models/blogs');
const router = express.Router();
const blogController = require('../controllers/blogController');


// Render the CREATE BLOG Page
router.get('/create', blogController.blog_create);

// Render the BLOG DETAILS Page
router.get('/:id', blogController.blog_details);
  
// DELETE A BLOG
router.delete('/:id', blogController.blog_delete);

// CREATE A BLOG
router.post('/', blogController.blog_post);

// Render the BLOGS Page
router.get('/', blogController.blog_blogs);
  
module.exports = router;