import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import rosterRoutes from './routes/roster.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));

app.use('/academy/roster', rosterRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

mongoose.connect( process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then( () => app.listen(PORT, () => console.log(`App running @ ${PORT}`)) )
  .catch( error => console.log(`${error.message}`) );