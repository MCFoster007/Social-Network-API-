"use strict";
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error);
db.once('open', () => console.log('Connected to Database'));
app.listen(3000, () => console.log(`Server running`));
