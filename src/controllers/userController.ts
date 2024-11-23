// import { User, Application } from '../models/index.js';
// import { Request, Response } from 'express';
const { User } = require('../models');

// Get all users
module.exports = {
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json({ message: 'Error retrieving users', error: err }));
  },
  
  getUserById(req, res) {
    User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      })
      .catch((err) => res.status(500).json({ message: 'Error retrieving user', error: err }));
  },
  
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(500).json({ message: 'Error creating user', error: err }));
  },
  
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      })
      .catch((err) => res.status(500).json({ message: 'Error updating user', error: err }));
  },
  
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then(() => {
        // Optionally remove associated thoughts
        return Thought.deleteMany({ userId: req.params.userId });
      })
      .then(() => res.status(204).json({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json({ message: 'Error deleting user', error: err }));
  },
};
    

  
  // export const getUsers = async (_req: Request, res: Response) => {
  //   try {
  //     const users = await User.find();
  //     res.json(users);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }

  // // Get a single user
  // export const getSingleUser = async (req: Request, res: Response) => {
  //   try {
  //     const user = await User.findOne({ _id: req.params.userId })
  //       .select('-__v');

  //     if (!user) {
  //       return res.status(404).json({ message: 'No user with that ID' });
  //     }

  //     res.json(user);
  //     return;
  //   } catch (err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  // }

  // // create a new user
  // export const createUser = async (req: Request, res: Response) => {
  //   try {
  //     const user = await User.create(req.body);
  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }

  // // Delete a user and associated apps
  // export const deleteUser = async (req: Request, res: Response) => {
  //   try {
  //     const user = await User.findOneAndDelete({ _id: req.params.userId });

  //     if (!user) {
  //       return res.status(404).json({ message: 'No user with that ID' });
  //     }

  //     await Application.deleteMany({ _id: { $in: user.applications } });
  //     res.json({ message: 'User and associated apps deleted!' })
  //     return;
  //   } catch (err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  // }

