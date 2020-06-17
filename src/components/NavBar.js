import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {

  render() {

    let link1 = "";
    let options = "";
    if(this.props.isLogged) {
      
      link1 = <Nav.Item><Link to="/diary">Diary</Link><span className="sr-only"></span></Nav.Item>
      options = <NavDropdown variant="light" title={this.props.username} className="ml-auto mr-2" alignRight aria-labelledby="navbarDropdownMenuLink">
                  <NavDropdown.Item onClick={this.props.onLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
    }
    

    return(
      <Navbar className="navbar" variant="dark" className="navbar-expand pl-4">
        <Navbar.Brand href="" id="logo">Nutrack</Navbar.Brand>
        <Nav className="pl-3" activeKey="link-1">
          <Nav.Item>
            {link1}
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