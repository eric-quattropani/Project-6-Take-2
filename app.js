const express = require('express');
const app = express();

app.set('view engine', 'pug');

const index = require('./routes');
const about = require('./routes/about');

app.use('/static', express.static('public'));

app.use('/', index);
app.use('/about', route);

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