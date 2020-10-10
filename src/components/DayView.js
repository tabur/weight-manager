import React from 'react';
//import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {removeMeal, getMeals} from '../actions/mealActions';
//import equal from  'fast-deep-equal';

class DayView extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(this.props.date);
    //this.props.dispatch(getMeals(this.props.token, this.props.date));
  }

  componentDidMount() {
    this.props.dispatch(getMeals(this.props.token, this.props.date));
  }
  
  // componentDidUpdate(prevProps) {
  //   if(!equal(this.props.mealList, prevProps.mealList)) {
  //     console.log("mealLists are not the same");
  //   }
  // }

  render(){
    let diaryRow = this.props.mealList.map((meal, i) => 
      (i%2===0) ?
      (<Row key={meal.id} id={meal.id} className="diary-item p-1 pl-4 bg-light">
        <Col md={3} className="cell">{meal.food.manufacturer} {meal.food.description}</Col>
        <Col md={1} className="cell">{meal.amount} g</Col>
        <Col md={1} id="energy" className="cell pr-1">{meal.food.energy*(meal.amount/100)}</Col>
        <Col md={1} id="carbs" className="cell">{meal.food.carbs*(meal.amount/100)} g</Col>
        <Col md={1} id="fat" className="cell">{meal.food.fat*(meal.amount/100)} g</Col>
        <Col md={1} id="protein" className="cell">{meal.food.protein*(meal.amount/100)} g</Col>
        <Col md={1}><a href="#" onClick={() => this.props.dispatch(removeMeal(this.props.token, meal.id))} className="text-danger font-weight-bold">X</a></Col>
      </Row>):
      (<Row key={meal.id} id={meal.id} className="diary-item p-1 pl-4">
        <Col md={3} className="cell">{meal.food.manufacturer} {meal.food.description}</Col>
        <Col md={1} className="cell">{meal.amount} g</Col>
        <Col md={1} id="energy" className="cell pr-1">{meal.food.energy*(meal.amount/100)}</Col>
        <Col md={1} id="carbs" className="cell">{meal.food.carbs*(meal.amount/100)} g</Col>
        <Col md={1} id="fat" className="cell">{meal.food.fat*(meal.amount/100)} g</Col>
        <Col md={1} id="protein" className="cell">{meal.food.protein*(meal.amount/100)} g</Col>
        <Col md={1}><a href="#" onClick={() => this.props.dispatch(removeMeal(this.props.token, meal.id, this.props.date))} className="text-danger font-weight-bold">X</a></Col>
      </Row>)
    )

    return(
      <div>
        <Row id="date-button-row" className="pl-4 py-1 text-light">
            <Col md={3}></Col>
              <div className="btn-group">
                <Button className="bg-header text-light" onClick={()=>this.props.onDateChange(-1)}>&lt;</Button>
              </div>
            <Col md={4} id="date" className="align-self-center text-center p-2 mx-1 bg-header">
              {this.props.date.toLocaleDateString("fi-FI")}
            </Col>
            <Button className="bg-header text-light" onClick={()=>this.props.onDateChange(1)}>&gt;</Button>
        </Row>
        <Row id="diary-headings" className="py-1 pl-4 font-weight-bold bg-header text-light rounded-top">
          <Col md={3}>Name</Col>
          <Col md={1}>Weight</Col>
          <Col md={1} className="pr-1">Energy</Col>
          <Col md={1}>Carbs</Col>
          <Col md={1}>Fat</Col>
          <Col md={1}>Protein</Col>
          <Col md={4}></Col>
        </Row>
        {diaryRow}
        <Row className="diary-item p-1 pl-4">
          <Col md={3} className="cell"><Link to="/addmeal">Add Item</Link></Col><Col md={9} className="cell"></Col>
        </Row>
        <Row id="diary-total-numbers" className="py-1 pl-4 font-weight-bold bg-header text-light">
          <Col md={1} className="offset-3">Total</Col>
          <Col md={1} className="pr-1">{this.props.mealList.reduce((a, v) => a + v.food.energy*(v.amount/100), 0).toFixed(1)} kJ</Col>
          <Col md={1}>{this.props.mealList.reduce((a, v) => a + v.food.carbs*(v.amount/100), 0).toFixed(1)} g</Col>
          <Col md={1}>{this.props.mealList.reduce((a, v) => a + v.food.fat*(v.amount/100), 0).toFixed(1)} g</Col>
          <Col md={1}>{this.props.mealList.reduce((a, v) => a + v.food.protein*(v.amount/100), 0).toFixed(1)} g</Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
    mealList:state.meal.mealList,
    token: state.login.token
	}
}

export default connect(mapStateToProps)(DayView);