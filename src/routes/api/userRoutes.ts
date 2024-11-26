const express = require('express')
const router = express.Router()
const User = require('../models/userRoutes')

//getting all users
router.get('/', (req, res)=> {
  res.send ('hello')
})
//getting one
router.get('/:id', (req, res) =>{
res.send(req.params.id)
})
//create one a post
router.post('/', (req, res) => {

}

// update one
router.patch('/:id', (req, res)=> {

})
//delete one
router.delete('/:id', (req, res)=>{

})



modules.export = router

