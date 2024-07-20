const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const path = require('path');

// connect to MongoDB
mongoose.connect(process.env.API_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT);
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.log(err));

// register view engine to create dynamic pages
// this looks in the 'views' folder for the ejs files
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Middleware to ignore favicon requests
app.use((req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.status(204).end();
  } else {
    next();
  }
});

// GET HOME PAGE 
app.get('/', (req, res) => {
  res.render('home', { title: 'Welcome to Blog World!'});
});

// Render the About page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});