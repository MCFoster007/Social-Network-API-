import { Thoughts, User } from "../models/index.js";
import { Request, Response } from "express";
import Thought from "../models/Thoughts.js";
import { thoughtRoutes } from "../../routes/api/thoughtRoutes.js";

// Function to get all of the applications by invoking the find() method 

// Get all thoughts

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.find();
    res.json(thoughts);
  } catch (error:any) {
    res.status(500).json({
      message: error.message
  });
  }
  
};
//get by id
export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const user = await Thought.findById(thoughtId);
    if(user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: 'Volunteer not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
* PUT Thought based on id /thoughtRouters/:id
* @param object id, username
* @returns a single Thought object
*/
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thoughtRouter with this id!' });
    }

    res.json(thought)
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};

/**
* DELETE Thought based on id /thoughtRouters/:id
* @param string id
* @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtRouterId});
    
    if(!thought) {
      res.status(404).json({
        message: 'No thoughtRouter with that ID'
      });
    } else {
      await User.deleteMany({ _id: { $in: thought.users } });
      res.json({ message: 'Thought and users deleted!' });
    }
    
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};




