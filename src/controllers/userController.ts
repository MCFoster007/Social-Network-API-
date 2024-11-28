import { User, Thoughts } from '../models/index.js';
import { Request, Response } from 'express';




//GET USERS -TESTED AND WORKING
  
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single user-TEST AND WORKING
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // create a new user-TESETD AND WORKS
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete a user and associated apps-TESTED AND KINDA WORKS
  export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        const thought = await Thoughts.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
//tested works
export const addFriend = async ( req: Request, res: Response)=> {
    console.log('You are adding a friend');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}


//teste and works
export const removeFriend = async ( req: Request, res: Response)=> {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { addFriendtId: req.params.addFriendtId } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}