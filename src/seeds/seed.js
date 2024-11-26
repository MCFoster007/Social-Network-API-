import mongoose from 'mongoose';
import User from '../models/User.js';
import Thought from '../models/Thoughts.js';

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
    console.log('Connected to the database.');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Cleared existing data.');

    // Generate users
    const users = Array.from({ length: 20 }, (_, i) => ({
      username: `user${i + 1}`,
      useremail: `user${i + 1}@example.com`,
    }));
    const createdUsers = await User.insertMany(users);
    console.log('Seeded users.');

    // Generate thoughts and assign to random users
    const thoughts = Array.from({ length: 40 }, (_, i) => {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      return {
        thoughtText: `This is thought number ${i + 1}`,
        username: randomUser.username,
        reactions: Array.from({ length: Math.floor(Math.random() * 5) }, () => ({
          reactionBody: `Reaction to thought ${i + 1}`,
          username: randomUser.username,
        })),
      };
    });
    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('Seeded thoughts.');

    // Update each user with their respective thoughts
    for (const thought of createdThoughts) {
      await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { userthoughts: thought._id } }
      );
    }
    console.log('Assigned thoughts to users.');

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
