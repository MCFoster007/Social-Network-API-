const router = require('express').Router();
const { 
  getAllThoughts, 
  getThoughtById, 
  createThought, 
  updateThought, 
  deleteThought 
} = require('../controllers/thoughtController');

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:thoughtId') // use :thoughtId
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;