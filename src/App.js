import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AddFood from './components/AddFood';
import NavBar from './components/NavBar';
import DayView from './components/DayView';
import Container from 'react-bootstrap/Container';
import Login from './components/Login';
import AddMeal from './components/AddMeal';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getMeals} from './actions/mealActions';
//import {DateProvider} from 'DateContext';

class App extends React.Component {
	constructor(props) {
    super(props);

    let tempDate = new Date();

    this.state = {
      date: tempDate,
    }
    //this.state.dispatch(getFoodList);
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
  

  
  onDateChange = (offset) => {
    let tempDate = this.state.date;
    tempDate.setDate(this.state.date.getDate()+offset);
    this.setState({date:tempDate});
    this.saveToStorage();
    this.props.dispatch(getMeals(this.props.token, this.state.date));
  }



  render() {
    return(
      <div className="App">
        <NavBar />
        <Container id="main-content" className="mt-3">
          <Switch>
            <Route exact path="/" render={() =>(
              this.props.isLogged ?
              (<Redirect to="/diary"/>):
              (<Login />)
            )}/>
            <Route path="/diary" render={() => (
              this.props.isLogged ?
              (<DayView onDateChange={this.onDateChange} date={this.state.date}/>):
              (<Redirect to="/"/>)
            )}/>
            <Route path="/addmeal" render={() => (
              this.props.isLogged ?
              (<AddMeal date={this.state.date}/>):
              (<Redirect to="/"/>)
            )}/>
            <Route path="/addfood" render={() => (
              this.props.isLogged ?
              (<AddFood />):
              (<Redirect to="/"/>)
            )}/>
            <Route render={() => (
              this.props.isLogged ?
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
    username:state.login.username,
    token:state.login.token
	}
}

export default withRouter(connect(mapStateToProps)(App));
