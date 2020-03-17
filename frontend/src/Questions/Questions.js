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
      <div className="container">
        <div className="row">
          <Link className="hover-card" to="/new-question">
            <div style={{ marginRight: "15px", paddingRight: "10px" }} className="card custome-card fath text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">+ New Question</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          {this.state.questions === null && <p>Loading questions...</p>}
          {
            this.state.questions && this.state.questions.map(question => (
              <div key={question.id} className="chil col-sm-12 col-md-4 col-lg-3">
                <Link className="hover-card" to={`/question/${question.id}`}>
                  <div className="card custome-card  text-white bg-success mb-3">
                    <div className="card-header">No. of people helping: {question.answers}</div>
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