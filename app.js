const express = require('express');
const { projects } = require('./data.json');
const app = express();

app.use(express.json());

// middleware setup
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// route setup
app.get('/', (req, res, next) => {
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/projects/:id', (req, res, next) => {
  const id = req.params.id;
  const project = projects[id];
      if (project) {
          res.render('project', { project });
  } else {
          const err = new Error;
          err.status = 404
          err.message = `Project ${id} does not exist`;
          next(err);
      }
});

app.use((req, res, next) => {
  console.log('Oops! Something went wrong...')
  res.status(404).render('page-not-found');
});

app.listen(3000, () => {
  console.log('listen on port 3000');
});
