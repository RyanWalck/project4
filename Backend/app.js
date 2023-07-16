const express = require('express');
const app = express();
const races = require('./routes/routers');
const racers = require('./routes/racersRouter');
const connectDB = require('./db/connectToDb');
require('dotenv').config();
const notFound = require('./middleware/notFound');
const cors = require('cors');


app.use(cors());

const port = process.env.PORT || 2000;

app.use(express.json());

app.use('/api/v1/races', races);

app.use('/api/v1/racers', racers);

app.use(notFound);

const startServer = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, console.log(`server here ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
