import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import rosterRoutes from './routes/roster.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://elitespacefootball-client.web.app',
  'https://www.elitespacefootball.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions, {credentials: true, origin: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));

app.use('/academy/roster', rosterRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

mongoose.connect( process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then( () => app.listen(PORT, () => console.log(`App running @ ${PORT}`)) )
  .catch( error => console.log(`${error.message}`) );