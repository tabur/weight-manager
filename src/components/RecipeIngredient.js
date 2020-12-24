import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FoodPicker from './FoodPicker';

const RecipeIngredient = (props) => {

  const [food, setFood] = useState();
  const [amount, setAmount] = useState('');
  const [id, setId] = useState(0);

  const handleClose = () => props.setShow(false);

  const selectFood = (e) => {
    let selected = props.foodList.filter(food => food.id === Number(e.target.value))[0];
    setFood(selected);
  }

  

  return (
  
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Ingredient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Amount:</Form.Label>
          <Form.Control type="text" name="amount" value={amount} placeholder="g" onChange={e => setAmount(e.target.value)} />
        <Form.Label>Ingredient:</Form.Label>
          <FoodPicker foodList={props.foodList} selectFood={selectFood}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>{
          props.addIngredient({"id":id,"amount":amount, "food": food});
          setId(id+1);
        }}>
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  
)
}

export default RecipeIngredient;