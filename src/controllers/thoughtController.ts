import { Thoughts, User } from "../models/index.js";
import { Request, Response } from "express";

// import { thoughtRoutes } from "../../routes/api/thoughtRoutes.js";

// Function to get all of the applications by invoking the find() method

// Get all thoughts
//testing and working
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.find();
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//get by id.  testing and working
export const getThoughtById = async (req: Request, res: Response) => {
  
  
  try {
    const user = await Thoughts.findById(req.params.thoughtId );
    console.log(user);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "Thought not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// * POST Thought/courses
// * @param object username
// * @returns a single Thoughtobject
// */tesint and working
export const createThought = async (req: Request, res: Response) => {
  const { username, thoughtText } = req.body;
  try {
    const newThought = await Thoughts.create({
      thoughtText: thoughtText, username: username,
    });
    res.status(201).json(newThought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * PUT Thought based on id /thoughtRouters/:id
 * @param object id, username
 * @returns a single Thought object
 * /testing and working
 */
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: "No thoughtRouter with this id!" });
    }

    res.json(thought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * DELETE Thought based on id /thoughtRouters/:id
 * @param string id
 * @returns string ******NOT WORKING*******
 */
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thoughts.findOneAndDelete({
      _id: req.params.thoughtRouterId,
    });

    if (!thought) {
      res.status(404).json({
        message: "No thoughtRouter with that ID",
      });
    } else {
      await User.findOneAndUpdate(
        { userthoughts: req.params.thoughtRouterId },
        { $pull: { userthoughts: req.params.thoughtRouterId } }
      );
      res.json({ message: "Thought and users deleted!" });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
