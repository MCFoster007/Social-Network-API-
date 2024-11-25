// import { Schema, model, Document, ObjectId } from 'mongoose';
// interface IUser extends Document {
//   first: string;
//   last: string;
//   age: number;
//   applications: ObjectId[];
//   fullName: string;
// }
const { Schema, model } = require('mongoose');
// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match a valid email address!'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
}, {
    id: false,
});
// Create a virtual property `friendcount` 
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
userSchema.set('toJSON', { virtuals: true });
// Initialize our User model
const User = model('User', userSchema);
// Setter to set the first and last name
// .set(function (v) {
//   const friendCount = v.split(' ')[0];
//   this.set({ friendCount});
// });
export default User;
