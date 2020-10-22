import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFoodList} from '../actions/foodActions';
import {addMeal} from '../actions/mealActions';
import FoodPicker from './FoodPicker';
import FoodStats from './FoodStats';

class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: null,
      amount: "",
      searchterm: "",
      value: "",
      validated: false
    }
  }
  
  onChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value
		this.setState(state);
	}

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if(!form.checkValidity()) {
      event.stopPropagation();
    }
    else {
      this.setState({validated:true});
      let meal = {"amount": this.state.amount, "food": this.state.selected}
      this.props.dispatch(addMeal(this.props.username, this.props.token, this.props.date, meal));
    }
    
  }

  onSearch = (e) => {
    this.onChange(e);
  }


  componentDidMount = () => {
    this.props.dispatch(getFoodList(this.props.token));
  }

  selectFood = (e) => {
    this.onChange(e);
    let selected = this.props.foodList.filter(food => food.id === Number(e.target.value))[0];
    this.setState({selected: selected});
    
  }

  render() {
    return(
      <div>
        <h2>Add Meal</h2>
        <Form size="sm" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Form.Row>
            <FoodPicker foodList={this.props.foodList} selectFood={this.selectFood}/>
            <Col>
              <Form.Row className="ml-2">
                <Col>
                  <Form.Row>
                    <Form.Group as={Col} md={3} className="pl-0 ml-0">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control type="text" name="amount" value={this.state.amount} placeholder="g" required onChange={this.onChange} />
                      <Form.Control.Feedback type="invalid">Enter amount</Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                    <FoodStats selected={this.state.selected} />
                  <Form.Row>
                    <Button type="submit" variant="success">Add meal</Button>
                    <div className="pl-2">
                      <Link to="/"><Button variant="danger">Cancel</Button> </Link>
                    </div>
                  </Form.Row>
                  <Form.Row className="pt-2">
                    <Link to="/addfood"><Button variant="primary">Add new food</Button></Link>
                    <div className="pl-2">
                      {this.state.selected ? 
                        <Link to={"/editfood/" + this.state.selected.id}><Button variant="primary">Edit food</Button></Link>:
                        <Button variant="primary" disabled>Edit food</Button>
                      }
                    </div>
                  </Form.Row>
                </Col>
              </Form.Row>
            </Col>
          </Form.Row>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    foodList:state.food.foodList,
    username:state.login.username,
    token:state.login.token
  }
}

export default connect(mapStateToProps)(AddMeal);