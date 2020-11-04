import React from 'react';
import Form from 'react-bootstrap/Form';

const FoodStats = (props) => {
  return(
    <>
      <Form.Group md={3} className="">
        <Form.Label>Nutrition per 100g</Form.Label>
        <Form.Row className="">
          <span>Manufacturer:&nbsp;</span><span>{props.selected?.manufacturer}</span>
        </Form.Row>
        <Form.Row>
          <span>Description:&nbsp;</span><span>{props.selected?.description}</span>
        </Form.Row>
        <Form.Row>
          <span>Energy:&nbsp;</span><span>{props.selected?.energy}</span>
        </Form.Row>
        <Form.Row>
          <span>Carbs:&nbsp;</span><span>{props.selected?.carbs}</span>
        </Form.Row>
        <Form.Row>
          <span>Sugar:&nbsp;</span><span>{props.selected?.sugar}</span>
        </Form.Row>
        <Form.Row>
          <span>Fiber:&nbsp;</span><span>{props.selected?.fiber}</span>
        </Form.Row>
        <Form.Row>
          <span>Total Fat:&nbsp;</span><span>{props.selected?.fat}</span>
        </Form.Row>
        <Form.Row>
          <span>Saturated fat:&nbsp;</span><span>{props.selected?.saturated}</span>
        </Form.Row>
        <Form.Row>
          <span>Unsaturated fat:&nbsp;</span><span>{props.selected?.unsaturated}</span>
        </Form.Row>
        <Form.Row>
          <span>Salt:&nbsp;</span><span>{props.selected?.salt}</span>
        </Form.Row>
      </Form.Group>
    </>
  )
}

export default FoodStats;