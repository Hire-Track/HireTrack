/* eslint-disable n/no-path-concat */
/* eslint-disable no-unused-vars */
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const port = process.env.PORT || 5000; // env port or use defualt 5000

// connect to DB
connectDB();

// serve express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve user api to client side
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));

// use custom errorhandler middleware (see middleware folder)
app.use(errorHandler);

// serve swagger documentation
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HireTrack API',
      version: '1.0.0',
      description: 'A simple Express Job Tracking API',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: [`${__dirname}/routes/*.js`],
};

const specs = swaggerJsDoc(options);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

// setup frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join('client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// serve api
app.listen(port, () => console.log(`Server started on port ${port}`));
