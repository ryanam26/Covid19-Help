import React, { Component } from 'react';
import {Route} from 'react-router-dom';
//import auth0Client from './Auth';
import NavBar from './NavBar/NavBar';
import Question from './Question/Question';
import Questions from './Questions/Questions';
//import Callback from './Callback';
import NewQuestion from './NewQuestion/NewQuestion';
//import SecuredRoute from './SecuredRoute/SecuredRoute';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     checkingSession: true,
  //   }
  // }

  // async componentDidMount() {
  //   if (this.props.location.pathname === '/callback') {
  //     this.setState({checkingSession:false});
  //     return;
  //   }
  //   try {
  //     await auth0Client.silentAuth();
  //     this.forceUpdate();
  //   } catch (err) {
  //     if (err.error !== 'login_required') console.log(err.error);
  //   }
  //   this.setState({checkingSession:false});
  // }

  render() {
    return (
      <div>
        {/* <p className="text-center">HERE, WE ARE FAMILY <span role="img" aria-label="emoji-thumbs-up" >❤️</span> </p> */}
        <h2 className="text-center">Get help from your community!</h2>
        <NavBar/>
        <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        {/*<Route exact path='/callback' component={Callback}/>*/}
        <Route path='/new-question'
                      component={NewQuestion}
        // checkingSession={this.state.checkingSession} 
        />
      </div>
    );
  }
}

export default App;