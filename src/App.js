import React from 'react';
//import logo from './logo.svg';
import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AddFood from './components/AddFood';
import NavBar from './components/NavBar';
import DayView from './components/DayView';
import Container from 'react-bootstrap/Container';
import Login from './components/Login';
import AddMeal from './components/AddMeal';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import connect from 'redux';

class App extends React.Component {
	constructor(props) {
    super(props);
    
    this.getFoodList();
  }

  //static date;

	//meals: [date, amount, food{}]

	//helpers
	
	loadFromStorage = () => {
		if(sessionStorage.getItem("state")) {
      let state = JSON.parse(sessionStorage.getItem("state"));
      state.date = new Date(state.date);
			this.setState(state);
		}
	}
	
	saveToStorage = () => {
		sessionStorage.setItem("state",JSON.stringify(this.state));
	}
	
	componentDidMount() {
		this.loadFromStorage();
  }
  
  setLoadingState = (loading) => {
		this.setState({
			loading:loading
    })
  }

  onDateChange = (offset) => {
    let tempDate = this.state.date;
    tempDate.setDate(this.state.date.getDate()+offset);
    this.setState({date:tempDate});
    this.saveToStorage();
    this.getMeals();
  }

  render() {
    return(
      <div className="App">
        <NavBar username={this.state.username} isLogged={this.state.isLogged}
        onLogout={this.onLogout} />
        <Container id="main-content" className="mt-3">
          <Switch>
            <Route exact path="/" render={() =>(
              this.state.isLogged ?
              (<Redirect to="/diary"/>):
              (<Login onLogin={this.onLogin} />)
            )}/>
            <Route path="/diary" render={() => (
              this.state.isLogged ?
              (<DayView onDateChange={this.onDateChange} removeMeal={this.removeMeal} getMeals={this.getMeals} meals={this.state.mealList} date={this.state.date} />):
              (<Redirect to="/"/>)
            )}/>
            <Route path="/addmeal" render={() => (
              this.state.isLogged ?
              (<AddMeal getFoodList = {this.getFoodList} foodList={this.state.foodList} addMeal={this.addMeal} />):
              (<Redirect to="/"/>)
            )}/>
            <Route path="/addfood" render={() => (
              this.state.isLogged ?
              (<AddFood addFood={this.addFood} />):
              (<Redirect to="/"/>)
            )}/>
            <Route render={() => (
              this.state.isLogged ?
              (<Redirect to="/diary"/>):
              (<Redirect to="/"/>)
			 	    )}/>
          </Switch>
        </Container>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.login.isLogged,
		token:state.login.token
	}
}

export default withRouter(connect(mapStateToProps)(App));
