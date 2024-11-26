import { Thoughts, User } from "../models/index.js";
import Thought from "../models/Thoughts.js";
// import { thoughtRoutes } from "../../routes/api/thoughtRoutes.js";
// Function to get all of the applications by invoking the find() method
// Get all thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
//get by id
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    console.log(thoughtId);
    try {
        const user = await Thought.findOne({ _id: thoughtId });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: "Thought not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
// * POST Thought/courses
// * @param object username
// * @returns a single Thoughtobject
// */
export const createThought = async (req, res) => {
    const { course } = req.body;
    try {
        const newThought = await Thought.create({
            course,
        });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
/**
 * PUT Thought based on id /thoughtRouters/:id
 * @param object id, username
 * @returns a single Thought object
 */
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: "No thoughtRouter with this id!" });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
/**
 * DELETE Thought based on id /thoughtRouters/:id
 * @param string id
 * @returns string
 */
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({
            _id: req.params.thoughtRouterId,
        });
        if (!thought) {
            res.status(404).json({
                message: "No thoughtRouter with that ID",
            });
        }
        else {
            await User.findOneAndUpdate({ userthoughts: req.params.thoughtRouterId }, { $pull: { userthoughts: req.params.thoughtRouterId } });
            res.json({ message: "Thought and users deleted!" });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
