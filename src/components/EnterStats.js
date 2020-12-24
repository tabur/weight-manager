import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';


const EnterStats = (props) => {
  const blankEntry = { name: "", value: ""};
  const [stats, setStats] = useState(
    [{...blankEntry}]
  );
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(props.date);
  //const [prevStats] = use
  
  const addInput = () => {
    setStats([...stats, {...blankEntry}]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <h2>Track Measurements</h2>
      <Form onSubmit={handleSubmit}>
        <Col>
          <Form.Row>
            <Form.Label htmlFor="date">Date</Form.Label><Form.Control type="text" id="date" value={date} onChange={setDate} />
          </Form.Row>
          <Form.Row>
            <Form.Label htmlFor="message">Message</Form.Label><Form.Control type="text" id="message" value={message} onChange={setMessage} />
          </Form.Row>
          {
            stats.map((val,id) => {
              const statId = `stat-${id}`;
              const nameId = `name-${id}`;
              return(
                <Form.Row key={`entry-$(id)`}>
                  <Form.Label htmlFor={nameId}>Measurement</Form.Label>
                  <Form.Control type="text" name={nameId} data-id={id} id={nameId} />
                  <Form.Label htmlFor={statId}>Value</Form.Label>
                  <Form.Control type="text" name={statId} data-id={id} id={statId} />
                </Form.Row>
              )
            })
          }
          <Form.Row>
            <Button onClick={addInput}>Add Measurement</Button>
          </Form.Row>
          <Form.Row>
            <Button type="submit" className="btn btn-success" >Submit</Button>
            <Link to="/"><Button className="btn btn-danger">Cancel</Button></Link>
          </Form.Row>
        </Col>
      </Form>
    </>
  );
}

export default EnterStats