const router = require('express').Router();

const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId') // use id to :userId
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
