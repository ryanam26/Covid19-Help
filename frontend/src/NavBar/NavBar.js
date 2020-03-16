import React from 'react';
import {Link} from 'react-router-dom';
// import auth0Client from '../Auth';

function NavBar(props) {
  // const signOut = () => {
  //   auth0Client.signOut();
  //   props.history.replace('/');
  // };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Covid19 - Help
      </Link>
    </nav>
  );
}

export default NavBar;