import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./Q.css";

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
    };
  }

  async componentDidMount() {
    const questions = (await axios.get('/api/questions')).data;
    this.setState({
      questions,
    });
  }

  render() {
    return (
      
      <div className="container text-center">
        <h4 className='text-center'>Hi friends!  We are all being affected by this pandemic, and this site is meant to help.
        This is a work in progress and I need volunteers to help and add additional features - it's built with the MERN stack.  Please reach out here: ryanam6480@gmail.com<br></br></h4>
        <hr></hr>
        <h5 className='text-center'><u>How this site works:</u></h5>
        <p className='text-center'>1. Click the grey box below and ask for help, enter the city you are located in and a simple request, e.g. I need a job, I need to pick up my elderly parents medication but I am stuck or where can I find sanitizer etc...<br></br></p>
        <p className='text-center'>2. Add a link to your bio, email or anything the helper can use to help you.  <b>Please do not expose any sensitive information.</b></p>
        <p className='text-center'>3. Helpers, click on the cards that you are interested in helping and submit an answer as to how you can help. <b>NO BAD ACTORS ALLOWED!</b></p>
        <p className='text-center'>4. Please reach out with feature suggestions at the email above. <b>Good luck, be safe, and kind to one another! </b></p>
        <p className="text-center">HERE, WE ARE FAMILY <span role="img" aria-label="emoji-thumbs-up" >❤️</span> </p>
        <div className="row">
          <Link className="hover-card" to="/new-question">
            <div style={{ paddingRight: "10px" }} className="card custome-card fath text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">+ Click Here</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          {this.state.questions === null && <p>Loading questions...</p>}
          {
            this.state.questions && this.state.questions.map(question => (
              <div key={question.id} className="chil col-sm-12 col-md-4 col-lg-3 chilll">
                <Link className="hover-card" to={`/question/${question.id}`}>
                  <div className="card custome-card  text-white bg-success mb-3">
                    <div className="card-header">No. of responses: {question.answers}</div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Questions;