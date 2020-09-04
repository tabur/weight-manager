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

class App extends React.Component {
	constructor(props) {
    super(props);
    
    //food.getFoodList();
  }

  //static date;

	//meals: [date, amount, food{}]

	//helpers
	
	// loadFromStorage = () => {
	// 	if(sessionStorage.getItem("props")) {
  //     let props = JSON.parse(sessionStorage.getItem("props"));
  //     props.date = new Date(props.date);
	// 		this.setprops(props);
	// 	}
	// }
	
	// componentDidMount() {
	// 	this.loadFromStorage();
  // }
  
  // setLoadingprops = (loading) => {
	// 	this.setprops({
	// 		loading:loading
  //   })
  // }

  onDateChange = (offset) => {
    //let tempDate = this.props.date;
    //tempDate.setDate(this.props.date.getDate()+offset);
    //this.setprops({date:tempDate});
    //this.saveToStorage();
    //this.getMeals();
  }

  render() {
    return(
      <div className="App">
        <NavBar username={this.props.username} isLogged={this.props.isLogged}
        onLogout={this.onLogout} />
        <Container id="main-content" className="mt-3">
          <Switch>
            <Route exact path="/" render={() =>(
              this.props.isLogged ?
              (<Redirect to="/diary"/>):
              (<Login />)
            )}/>
            <Route path="/diary" render={() => (
              this.props.isLogged ?
              (<DayView />):
              (<Redirect to="/"/>)
            )}/>
            <Route path="/addmeal" render={() => (
              this.props.isLogged ?
              (<AddMeal />):
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
