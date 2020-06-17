import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    }
  }

  onLogin =(event) => {
    event.preventDefault();
    event.stopPropagation();

    let user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.onLogin(user);
  }

  
  onChange = (event) => {
    let state = {}
    state[event.target.name] = event.target.value
    this.setState(state);
  }


  render() {
    return(
      <Row className="pt-3">
        <Col md={4}></Col>
        <Col>
        <Form onSubmit={this.onLogin}>
          <Form.Label>Login</Form.Label>
          
          <Form.Control type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="Username" />
          <div className="pt-1">
            <Form.Control type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" />
          </div>
          <div className="pt-2"><Button type="submit">Login</Button></div>
        </Form>
        </Col>
        <Col md={4}></Col>
      </Row>
    )
  }
  

}