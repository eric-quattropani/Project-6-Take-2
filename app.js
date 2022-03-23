const express = require('express');
const { projects } = require('./data.json');
const app = express();

app.use(express.json());

app.set('view engine', 'pug');

const index = require('./routes');
const about = require('./routes/about');

app.use('/static', express.static('public'));

//app.use('/', index);
// app.use('/about', route);

app.get('/', (req, res, next) => {
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});
/* Dynamic "project" routes */
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
  console.log('Oops!  It looks like something went wrong on the server.')
  res.status(404).render('page-not-found');
});

app.use((err, req, res, next) => {

  if (err.status === 404) {
    console.log('Something went wrong...')
    res.status(404).render('page-not-found', { err });
  } else {
    err.message = err.message || `Something went wrong...`;
    res.status(err.status || 500).render('error', { err });
  };
});

app.listen(3000, () => {
  console.log('listen on port 3000');
});


// look at this: https://github.com/pattherogue/Static-Node.js-and-Express-Site/blob/main/data.json