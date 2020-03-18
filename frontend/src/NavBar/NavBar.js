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
      <Link className="navbar-brand" style={{ backgroundColor: '#18BC9C', borderRadius: '0.25rem'}} to="/">
        Covid19 - Help App
      </Link>
    </nav>
  );
}

export default NavBar;