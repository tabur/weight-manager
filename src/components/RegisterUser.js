import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import {onRegister} from '../actions/userActions';

const RegisterUser = (props) => {

  const [username, setUsername] = useState();
  //const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const dispatch = useDispatch();

  let user = {
    username: username,
    //email: email,
    password: password
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if(password !== password2) {
      alert("Password mismatch");
    } else {
      dispatch(onRegister(user));
    }
  }

  return(
    <>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
      <Col>
        <Form.Row>
          <Form.Group>
            <Form.Label>Username:
              <Form.Control type="text" name="username" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
            </Form.Label>
          </Form.Group>
        </Form.Row>
        {/* <Form.Row>
          <Form.Group>
            <Form.Label>Email:
              <Form.Control type="text" name="email" value={email} placeholder="Email" onChange={setEmail} />
            </Form.Label>
          </Form.Group>
        </Form.Row>*/}
        <Form.Row> 
          <Form.Group>
            <Form.Label>Password:
              <Form.Control type="password" name="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Label>
          </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group>
            <Form.Label>Re-enter password:
              <Form.Control type="password" name="password2" value={password2} placeholder="Password" onChange={e => setPassword2(e.target.value)} />
            </Form.Label>
          </Form.Group>
          
          </Form.Row>
          
        <Form.Row>
          <Form.Group>
            <Button type="submit" className="btn btn-success mr-1">Register</Button>
            <Link to="/"><Button className="btn btn-danger">Cancel</Button></Link>
          </Form.Group>
        </Form.Row>
        </Col>
      </Form>
    </>
  );
}

export default RegisterUser;