
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); 


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});