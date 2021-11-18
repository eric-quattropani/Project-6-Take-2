const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

router.get('/', (req, res) => {
    res.render('index', { projects });
});

router.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    
    if (projects[req.params.id]) {
        res.render('project', projects[id]);
      } else {
        const err = new Error();
        err.status = 404;
        err.message = `Looks like the project you requested doesn't exist.`;
        next(err);
      };
});

module.exports = router;