const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const todoModel = require('../model/todo.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// List
router.get('/todos', function(req, res, next) {
   
    todoModel.list(req.query.unaccomplishedOnly, req.query.searchText, req.query.start).then(posts => {
        res.json(posts);
    }).catch(next);
});

// Create
router.post('/todos', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.create(mood, text).then(post => {
        res.json(post);
    }).catch(next);
});

router.post('/todos/:id', function(req, res, next) {
    const {id} = req.params;
    if (!id) {
        const err = new Error('Post ID are required');
        err.status = 400;
        throw err;
    }
    todoModel.accom(id).then(post => {
        res.json(post);
    }).catch(next);
});


module.exports = router;
