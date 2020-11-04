import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import {onLogout} from '../actions/userActions';
import {connect} from 'react-redux';

class NavBar extends React.Component {

  render() {

    let link1 = "";
    let link2 = "";
    let options = "";
    if(this.props.isLogged) {
      
      link1 = <Nav.Item><Link to="/diary">Diary</Link><span className="sr-only"></span></Nav.Item>
      link2 = <Nav.Item><Link to="/addrecipe">Add Recipe</Link></Nav.Item>
      options = <NavDropdown variant="light" title={this.props.username} className="ml-auto mr-2" alignRight aria-labelledby="navbarDropdownMenuLink">
                  <NavDropdown.Item onClick={() => {this.props.dispatch(onLogout(this.props.token))}}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
    }
    

    return(
      <Navbar variant="dark" className="navbar navbar-expand pl-4">
        <Navbar.Brand href="" id="logo">Futark</Navbar.Brand>
        <Nav className="pl-3" activeKey="link-1">
          <Nav.Item>
            {link1}
          </Nav.Item>
          <Nav.Item>
            {link2}
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link eventKey="link-2" href="#">Statistics</Nav.Link>
          </Nav.Item> */}
        </Nav>
        {options}
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username:state.user.username,
    token:state.user.token,
    isLogged:state.user.isLogged,

  }
}

export default connect(mapStateToProps)(NavBar);