

// Schema to create User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  
  },
  useremail: {
    type: String,
    required: true,
   unique: true,
   match: [/.+@.+\..+/, 'Must match a valid email address!'],
  },
    userthoughts:{
        type: String
       required: true,
       default: String.now
      }
    
})
module.exports =mongoose.model('User', userSchema)

      

export default User;
