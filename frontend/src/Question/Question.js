import React, {Component} from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
//import auth0Client from '../Auth';
import { Animated } from "react-animated-css";

import "./q.css"

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const { match: { params } } = this.props;
    const question = (await axios.get(`/api/questions/${params.questionId}`)).data;
    this.setState({
      question,
    });
  }

  async submitAnswer(answer) {
    await axios.post(`/api/questions/answer/${this.state.question.id}`, {
      answer,
    }
    //   , {
    //   headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    // 
    );
    await this.refreshQuestion();
  }

  render() {
    const {question} = this.state;
    if (question === null) return <p>Loading ...</p>;
    
    return (
      <Animated animationIn="fadeIn" animationOut="zoomOutDown" animationInDuration={800} animationOutDuration={1000} isVisible={true}>
        {/* <p>Hi there this is a test</p> */}
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} />
              <p>
                Answers:
              </p>
            {
              question.answers.reverse().map((answer, idx) => (
                <p className="lead q-p" key={idx}>{answer}</p>
              ))
            }
          </div>
        </div>
        </div>
        </Animated>
    )
  }
}

export default Question;