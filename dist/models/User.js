import { Schema, model } from 'mongoose';
// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
        unique: true,
    },
    userthoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
});
const User = model('User', userSchema);
export default User;
