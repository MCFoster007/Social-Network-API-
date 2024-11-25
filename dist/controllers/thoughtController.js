"use strict";
// import { Application, User } from '../models/index.js';
// import { Request, Response } from 'express';
// Function to get all of the applications by invoking the find() method with no arguments.
// Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
// export const getApplications = async (_req: Request, res: Response) => {
//   try {
//     const applications = await Application.find();
//     res.json(applications);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }
const { Thought, User } = require('../models');
// Get all thoughts
module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate('username') // Assuming you want to populate the username from the Thought model
            .then((thoughts) => res.status(200).json(thoughts))
            .catch((err) => res.status(500).json({ message: 'Error retrieving thoughts', error: err }));
    },
    getThoughtById(req, res) {
        Thought.findById(req.params.thoughtId)
            .then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json(thought);
        })
            .catch((err) => res.status(500).json({ message: 'Error retrieving thought', error: err }));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
            // Optionally push the thought's ID to the associated user's thoughts array
            return User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
        })
            .then((user) => res.status(201).json(user))
            .catch((err) => res.status(500).json({ message: 'Error creating thought', error: err }));
    },
    updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
            .then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json(thought);
        })
            .catch((err) => res.status(500).json({ message: 'Error updating thought', error: err }));
    },
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.thoughtId)
            .then(() => res.status(204).json())
            .catch((err) => res.status(500).json({ message: 'Error deleting thought', error: err }));
    },
};
