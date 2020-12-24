import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import AddFood from './components/AddFood';
import NavBar from './components/NavBar';
import DayView from './components/DayView';
import Container from 'react-bootstrap/Container';
import Login from './components/Login';
import AddMeal from './components/AddMeal';
import EditFood from './components/EditFood';
import AddRecipe from './components/AddRecipe';
import RegisterUser from './components/RegisterUser';
import {getMeals} from './actions/mealActions';
import EnterStats from './components/EnterStats';
//import {DateProvider} from 'DateContext';

class App extends React.Component {
	constructor(props) {
    super(props);

    let tempDate = new Date();

    this.state = {
      date: tempDate,
    }
  }
  
  onDateChange = (offset) => {
    let tempDate = this.state.date;
    tempDate.setDate(this.state.date.getDate()+offset);
    this.setState({date:tempDate});
    //this.saveToStorage();
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
            <Route path="/register" render={() => (
              this.props.isLogged ?
              (<Redirect to="/"/>):
              (<RegisterUser />)
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
            <Route path="/addrecipe" render={() => (
              this.props.isLogged ?
              (<AddRecipe />):
              (<Redirect to="/"/>)
            )}/>
            <Route path="/trackstats" render={() => (
              this.props.isLogged ?
              (<EnterStats />):
              (<Redirect to="/"/>)
            )}/>
            <Route path="/editfood/:foodId" render={() => (
              this.props.isLogged ?
              (<EditFood />):
              (<Redirect to="/" />)
            )} />
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
    isLogged:state.user.isLogged,
    username:state.user.username,
    token:state.user.token
	}
}

export default withRouter(connect(mapStateToProps)(App));
