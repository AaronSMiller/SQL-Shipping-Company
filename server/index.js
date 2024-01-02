// This is the main server file for a Node.js application using the Express framework.
// It sets up middleware for parsing JSON and URL-encoded request bodies, serves static files,
// enables Cross-Origin Resource Sharing (CORS), and registers the API routes.
// The application listens on a specified port (either from environment variables or default to 5050),
// making it ready to handle incoming HTTP requests to defined routes.

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5050; // Use the PORT from environment variables if available

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

// Register the API routes
app.use('/api', apiRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
