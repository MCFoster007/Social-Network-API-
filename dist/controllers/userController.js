import { User, Thoughts } from '../models/index.js';
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Get a single user
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// create a new user
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Delete a user and associated apps
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        const thought = await Thoughts.findOneAndUpdate({ users: req.params.userId }, { $pull: { users: req.params.userId } }, { new: true });
        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }
        return res.json({ message: 'User successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
export const addFriend = async (req, res) => {
    console.log('You are adding a friend');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.body } }, { runValidators: true, new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: { addFriendtId: req.params.addFriendtId } } }, { runValidators: true, new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
