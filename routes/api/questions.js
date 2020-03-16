const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const QSchema = mongoose.Schema({

    id: Number,
    title: String,
    description: String,
    answers: [String],
    author: String

})



const questionsModel = mongoose.model("questions", QSchema)

// retrieve all questions
router.get('/', (req, res) => {
    questionsModel.find()
        .then(q => res.send(q.reverse().map(q => ({
            id: q.id,
            title: q.title,
            description: q.description,
            answers: q.answers.length

        }))))

})


// get a specific question
router.get('/:id', (req, res) => {
    questionsModel.findOne({ id: req.params.id })
        .then(q => res.send(q))
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
router.post('/', checkJwt, (req, res) => {
    const { title, description } = req.body;
    const newQuestion = new questionsModel({
        id: Math.random(),
        title,
        description,
        answers: [],
        author: req.user.name,
    });
    newQuestion.save().then(q=>res.send(q));

});

// insert a new answer to a question
router.post('/answer/:id', checkJwt, (req, res) => {
    const { answer } = req.body;


    questionsModel.findOne({ id: req.params.id })
        .then((record) => {
            record.answers.push(answer);
            record.save().then( q => res.send(q))
        })

});





module.exports = router;