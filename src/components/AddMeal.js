import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFoodList} from '../actions/foodActions';
import {addMeal} from '../actions/mealActions'


class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: null,
      amount: "",
      searchterm: "",
      value: ""
    }
  }
  
  onChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value
		this.setState(state);
	}

  onSubmit = (event) => {
    event.preventDefault();
    let meal = {"amount": this.state.amount, "food": this.state.selected}
    this.props.dispatch(addMeal(this.props.username, this.props.token, this.props.date, meal));
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

    let foodRow = this.props.foodList.map(food =>
      <option key={food.id} value={food.id}>{food.manufacturer} {food.description}</option>
    )

    let foodStats = "";
    
    if(this.state.selected) {
      foodStats = 
        <div>
          <Form.Row className="pt-1">
            <p>Manufacturer:&nbsp;</p><p>{this.state.selected.manufacturer}</p>
          </Form.Row>
          <Form.Row>
            <p>Description:&nbsp;</p><p>{this.state.selected.description}</p>
          </Form.Row>
          <Form.Row>
            <p>Energy:&nbsp;</p><p>{this.state.selected.energy}</p>
          </Form.Row>
          <Form.Row>
            <p>Carbs:&nbsp;</p><p>{this.state.selected.carbs}</p>
          </Form.Row>
          <Form.Row>
            <p>Sugar:&nbsp;</p><p>{this.state.selected.sugar}</p>
          </Form.Row>
          <Form.Row>
            <p>Fiber:&nbsp;</p><p>{this.state.selected.fiber}</p>
          </Form.Row>
          <Form.Row>
            <p>Total Fat:&nbsp;</p><p>{this.state.selected.fat}</p>
          </Form.Row>
          <Form.Row>
            <p>Saturated fat:&nbsp;</p><p>{this.state.selected.saturated}</p>
          </Form.Row>
          <Form.Row>
            <p>Unsaturated fat:&nbsp;</p><p>{this.state.selected.unsaturated}</p>
          </Form.Row>
          <Form.Row>
            <p>Salt:&nbsp;</p><p>{this.state.selected.salt}</p>
          </Form.Row>
        </div>
    }
    else {
      foodStats =
        <div>
          <Form.Row className="pt-1">
            <p>Manufacturer:&nbsp;</p><p></p>
          </Form.Row>
          <Form.Row>
            <p>Description:&nbsp;</p><p></p>
          </Form.Row>
          <Form.Row>
            <p>Energy:&nbsp;</p><p></p>
          </Form.Row>
          <Form.Row>
            <p>Carbs:&nbsp;</p><p></p>
          </Form.Row>
          <Form.Row>
            <p>Sugar:&nbsp;</p><p></p>
          </Form.Row>
          <Form.Row>
            <p>Fiber:&nbsp;</p><p></p>
          </Form.Row>
          <Form.Row>
            <p>Total Fat:&nbsp;</p><p></p>
          </Form.Row>
          <Form.Row>
            <p>Saturated fat:&nbsp;</p><p></p>
          </Form.Row>
          <Form.Row>
            <p>Unsaturated fat:&nbsp;</p><p></p>
          </Form.Row>
          <Form.Row>
            <p>Salt:&nbsp;</p><p></p>
          </Form.Row>
        </div>
    }


    return(
      <div>
        <h2>Add Meal</h2>
        <Form size="sm" onSubmit={this.onSubmit}>
          <Form.Row>
            <Col>
              <Form.Row>
                <Col>
                  <Form.Label>Search</Form.Label>
                  <Form.Control type="text" name="search" value={this.state.searchterm} onChange={this.onSearch}/>
                </Col>
              </Form.Row>
              <Form.Row className="pt-2">
                <Form.Group as={Col} className="pl-0 ml-0">
                  <Form.Label>Food</Form.Label>
                  <Form.Control as="select" value={this.state.value} onChange={this.selectFood}>
                    <option>select food item</option>
                    {foodRow}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Col>
            <Col>
              <Form.Row className="pl-2 pt-2">
                <Col>
                  <Form.Row>
                    <Form.Group as={Col} md={3} className="pl-0 ml-0">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control type="text" name="amount" value={this.state.amount} placeholder="g" onChange={this.onChange} />
                    </Form.Group>
                  </Form.Row>

                  {foodStats}
                  <Form.Row>
                    <Button type="submit" variant="success" onClick={this.onSubmit}>Add meal</Button>
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