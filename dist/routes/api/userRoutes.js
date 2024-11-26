"use strict";
const express = require('express');
const router = express.Router();
//getting all users
router.get('/', (req, res) => {
    res.send('hello');
});
//getting one
router.get('/:id', (req, res) => {
    res.send(req.params.id);
});
//create one a post
router.post('/', (req, res) => {
}
// update one
, 
// update one
router.patch('/:id', (req, res) => {
})
//delete one
, 
//delete one
router.delete('/:id', (req, res) => {
}), modules.export = router);
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
router.route('/')
    .get(getAllUsers)
    .post(createUser);
router.route('/:userId') // use id to :userId
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
module.exports = router;
