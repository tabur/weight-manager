import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from '../styles/foodPicker.module.css';

const FoodPicker = (props) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 12;
  let maxPage = 0;


  let filteredRows = props.foodList.filter(food => {
    if(searchTerm) {
      let combinedName = `${food.manufacturer} ${food.description}`;
      combinedName = combinedName.toLowerCase();
      return (combinedName.includes(searchTerm));
    }
    return(props.foodList);
  })
  maxPage = Math.ceil(filteredRows.length / pageSize);
  filteredRows = filteredRows.slice(page*pageSize, page*pageSize+pageSize);

  let foodRows = filteredRows.map((food, i) => {
    return(
      <Form.Row key={food.id}>
        <Button className={styles.rowButton} value={food.id} onClick={props.selectFood}>{food.manufacturer} {food.description}</Button>
      </Form.Row>
    
    )
  })
  
  return(
    <Col>
      <Form.Row>
        <Col>
          <Form.Label>Search</Form.Label>
          <Form.Control type="text" name="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        </Col>
      </Form.Row>
      <Form.Row className="mt-2">
        <Form.Group as={Col} className="">
          <Form.Label>Food</Form.Label>
          <Col md="12" id="rowContainer">
            {foodRows.length ? foodRows : <span>No foods found</span>}
          </Col>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group>
          <div className="buttonContainer">
            
            <Button id="prevButton" disabled={page===0} className="mr-1" onClick={e => setPage(page-1)}>Prev</Button>
            <Button id="nextButton" disabled={page===maxPage-1} onClick={e => setPage(page+1)}>Next</Button>
          </div>
        </Form.Group>
      </Form.Row>
    </Col>              
  );
}

export default FoodPicker;