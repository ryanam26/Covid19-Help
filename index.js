// import dependencies

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require('mongoose')
// define the Express app
const app = express();


// the database

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected...'))
  .catch(err => console.log(err))


const QSchema = mongoose.Schema({

  id: Number,
  title: String,
  description: String,
  answers: [String],
  author: String

})

const questionsModel = mongoose.model("questions", QSchema)

// enhance your app security with helmet
app.use(helmet());

// user BodyParser to parse application.json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));


// retrieve all questions
app.get('/', (req, res) => {
  questionsModel.find()
    .then(q => res.json(q.reverse().map(q => ({
      id: q.id,
      title: q.title,
      description: q.description,
      answers: q.answers.length

    }))))

})


// get a specific question
app.get('/:id', (req, res) => {
  questionsModel.findOne({ id: req.params.id })
    .then(qu => res.json(qu))
})

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-8phuysyw.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'VaTIJDgVoTChhck5JhspfFo8FoUv3LLT',
  issuer: `https://dev-8phuysyw.auth0.com/`,
  algorithms: ['RS256']
});

// insert a new question
app.post('/', checkJwt, (req, res) => {
  const { title, description } = req.body;
  const newQuestion = new questionsModel({
    id: Math.random(),
    title,
    description,
    answers: [],
    author: req.user.name,
  });
  newQuestion.save().then(res.json());

});

// insert a new answer to a question
app.post('/answer/:id', checkJwt, (req, res) => {
  const { answer } = req.body;


  questionsModel.findOne({ id: req.params.id })
    .then((record) => {
      record.answers.push(answer);
      record.save().then(res.json())
  })
  
});


if (process.env.NODE_ENV === 'production') {
  // set static folder

  app.get('*', (req, res) => {

    app.use(express.static('fontend/build'));

    res.sendFile(path.resolve(__dirname, "frontend", 'build', 'index.html'))

  })
}

const port = process.env.PORT || 5000;
// start the server
app.listen(port, () => {
  console.log('listening on port 5000');
});