import express from 'express';
// import db from './config/connection.js';
// import routes from './routes/index.js';
import mongoose from 'mongoose';

const PORT = 3001;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// connect to mongo
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// api routes
app.use('/api, require('./routes'));


  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

