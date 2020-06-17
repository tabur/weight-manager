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


class App extends React.Component {
	constructor(props) {
    super(props);


    let tempDate = new Date();

    // tilapäinen säilö
    this.state = {
      foodList:[],
			food:{},
      loading:false,
      isLogged: false,
      username:"",
      token: "",
      date: tempDate,
      counter: 0,
      mealList: []
    }
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
  
  // REST - edit toistaiseksi puuttuu

  getFoodList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json", "token":this.state.token}			
    }
    this.setLoadingState(true);
		fetch("/api/food",request).then(response => {
      this.setLoadingState(false);
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						foodList:data
					})
          this.saveToStorage();
				}).catch(error => {
					console.error("Failed to parse JSON data:",error);
				})
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
      this.setLoadingState(false);
			console.error("Server responded with an error:",error);
		})
  }
  
  getMeals = () => {
    let request = {
			method:"GET",
			mode:"cors",
      headers:{"Content-type":"application/json", "token":this.state.token, "mealDate":this.state.date.toISOString()}
      
    }
    fetch("/api/diary",request).then(response => {
      this.setLoadingState(false);
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						mealList:data
					})
          this.saveToStorage();
          //console.log(data);
				}).catch(error => {
					console.error("Failed to parse JSON data:",error);
				})
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
      this.setLoadingState(false);
			console.error("Server responded with an error:",error);
		})
  }
  
	removeFoodFromList = (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json", "token":this.state.token}
    }
    this.setLoadingState(true);
		fetch("/api/food/"+id,request).then(response => {
			this.setLoadingState(false);
      if(response.ok) {
				console.log("Food removed:", {id});
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
      this.setLoadingState(false);
			console.error(error);
		})
	}

  addFood = (food) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json", "token":this.state.token},
			body:JSON.stringify(food)
    }
    this.setLoadingState(true);
		fetch("/api/food",request).then(response => {
      this.setLoadingState(false);
			if(response.ok) {
        this.props.history.push("/addmeal");
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
      this.setLoadingState(false);
			console.error(error);
		})
  }
  
  addMeal = (meal) => {
    let newMeal = {"owner": this.state.username, "date": this.state.date, "amount": meal.amount, "food": meal.food}
    //console.log(newMeal);
    let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json", "token":this.state.token},
			body:JSON.stringify(newMeal)
    }
    //console.log(request);
    this.setLoadingState(true);
		fetch("/api/meal",request).then(response => {
      this.setLoadingState(false);
			if(response.ok) {
        this.props.history.push("/diary");
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
      this.setLoadingState(false);
			console.error(error);
		})
  }

  removeMeal = (id) => {
    let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json", "token":this.state.token}
    }
    this.setLoadingState(true);
		fetch("/api/meal/"+id,request).then(response => {
			this.setLoadingState(false);
      if(response.ok) {
        this.getMeals();
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
      this.setLoadingState(false);
			console.error(error);
		})
  }

  onLogin = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
    }
    this.setLoadingState(true);
		fetch("/login",request).then(response => {
			this.setLoadingState(false);
			if(response.ok) {
				response.json().then(data => {
					this.setState({
            token:data.token,
            username:data.username,
            isLogged:true
					}, () => {
						this.saveToStorage();
					}) 
				}).catch(error => {
					console.error(error)
        })
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
			this.setLoadingState(false);
			console.error(error);
    })
    
	}
	
	onLogout = () => {
		let request = {
			method:"POST",
			mode:"cors",
			headers: {"Content-type":"application/json",
			"token":this.state.token}
		}
    this.setLoadingState(true);
		fetch("/logout",request).then(response => {
			this.setState({
        username:"",
				token:"",
				isLogged:false
			})
			sessionStorage.removeItem("state");
		}).catch(error => {
			this.setLoadingState(false);
			console.error(error);
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

export default withRouter(App);
