import React, {Component, Fragment} from 'react';
//import {withRouter} from 'react-router-dom';
//import auth0Client from '../Auth';
import "./q.css"

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  submit() {
    this.props.submitAnswer(this.state.answer);

    this.setState({
      answer: '',
    });
    window.location.reload()
  }

  render() {
    
   // if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">How can you help:</label>
          <input
            id="answer-input"
            type="text"
            onChange={(e) => {this.updateAnswer(e.target.value)}}
            className="form-control"
            placeholder="I can help with...."
            value={this.state.answer}
          />
        </div>

          <button
            id="answer-button"
            className={`btn btn-primary ${this.state.answer.length > 0 ? "enable" : "disable"}`}
            onClick={() => { this.submit() }}
          >
            Submit
          </button>
          <hr className="my-4" />
      </Fragment>
    )
    
  }
}

export default SubmitAnswer;