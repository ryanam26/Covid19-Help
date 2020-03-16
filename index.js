// import dependencies

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const mongoose = require('mongoose')
// define the Express app
const app = express();

const questions = require('./routes/api/questions')


// the database

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected...'))
  .catch(err => console.log(err))



// enhance your app security with helmet
app.use(helmet());

// user BodyParser to parse application.json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

//use routes

app.use('/api/questions', questions);



  // set static folder
 if (process.env.NODE_ENV === 'production') {

  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))

  })
}




const port = process.env.PORT || 5000;
// start the server
app.listen(port, () => {
  console.log('listening on port 5000');
});