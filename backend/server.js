const express = require('express');
const app = express();
const UserInteraction = require('./models/UserInteraction');  // Import the model

const cors = require('cors');
// Enable CORS for your frontend server
const corsOptions = {
  origin: 'http://localhost:3001', // Allow only your frontend to make requests
  methods: ['GET', 'POST'], // Allow GET and POST methods
  allowedHeaders: ['Content-Type'], // Allow Content-Type header in requests
};
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://bouaziz:X7ogeSGqRE10IuiA@cluster0.z6l6i.mongodb.net/mydatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.use(express.json()); // Middleware to parse JSON requests

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Data Detective API!');
});

// POST /user-interaction - Save a new user interaction
app.post('/user-interaction', async (req, res) => {
  const { userId, featureUsed, timestamp, metadata } = req.body; // Extract data from request body

  try {
    // Create a new instance of the UserInteraction model
    const newInteraction = new UserInteraction({
      userId,
      featureUsed,
      timestamp, // Optional; defaults to `Date.now` if not provided
      metadata,  // Expecting an object with `device` and `browser`
    });

    // Save the new interaction to the database
    await newInteraction.save();

    res.status(201).json({ message: 'User interaction saved successfully!' });
  } catch (error) {
    console.error('Error saving interaction:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});





// API to get the number of interactions for each feature
app.get('/stats/feature-usage', async (req, res) => {
  try {
    // Use aggregation to group by featureUsed and count interactions
    const stats = await UserInteraction.aggregate([
      { 
        $group: { 
          _id: '$featureUsed', // Group by the feature used
          count: { $sum: 1 }   // Count the number of interactions for each feature
        }
      },
      { 
        $sort: { count: -1 }  // Sort by count in descending order
      }
    ]);

    res.status(200).json(stats);  // Send the stats as JSON response
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

  
  // API to get the number of interactions by user
  app.get('/stats/user-interactions', async (req, res) => {
    try {
      // Use aggregation to group by userId and count interactions
      const stats = await UserInteraction.aggregate([
        {
          $group: {
            _id: '$userId', // Group by userId
            count: { $sum: 1 } // Count the number of interactions per user
          }
        },
        {
          $sort: { count: -1 } // Sort by the most active user (descending order)
        }
      ]);
  
      res.status(200).json(stats); // Send the stats as a JSON response
    } catch (err) {
      console.error('Error fetching user interaction stats:', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
  





  


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
