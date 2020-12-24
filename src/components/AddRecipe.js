import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Link} from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import RecipeIngredient from './RecipeIngredient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

export const AddRecipe = (props) => {

  const [name, setName] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const foodList = useSelector((state) => state.food.foodList);

  const handleSubmit = (event) => {
    event.preventDefault();
    
  }

  const addIngredient = (ingredient) => {
    //let tempIngredient={ingredient};
    setIngredients([...ingredients, ingredient]);
    
  }
  
  return( 
    <>
      <RecipeIngredient foodList={foodList} addIngredient={addIngredient} show={showModal} setShow={setShowModal} />
      <h2>Create Recipe</h2>
      <Form size="sm" onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Row>
          <Form.Label>
            Name:
            <Form.Control type="text" name="name" value={name} placeholder="Name" onChange={setName} />
          </Form.Label>
        </Form.Row>
        </Form.Group>
        <Form.Group>
          <div>
            {
            ingredients.map((val,id) => {
              console.log(ingredients);
              //console.log(val);

              return(
                <Row key={`ingredient-${id}`}>
                  <Col>{val.food.manufacturer} {val.food.description}</Col>
                  <Col>{val.amount}</Col>
                  <Col>
                    <Button id={val.id} variant="outline-danger" size="sm" 
                      onClick={(e) => {setIngredients(ingredients.filter(i => i.id !== e.target.id))
                      console.log(e.target)}} 
                      className=""><FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </Col>
                </Row>
              )
            })
            }
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            
            <Button onClick={setShowModal}>Add Ingredient</Button>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Button type="submit" variant="success" onClick={handleSubmit}>Create Recipe</Button>
            <div className="pl-2">
              <Link to="/"><Button variant="danger">Cancel</Button> </Link>
            </div>
            </Form.Row>
        </Form.Group>                    
    
      </Form>
    </>
  )

  
}

export default AddRecipe