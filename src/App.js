import React, { Component }  from 'react';
import AppplicationViews from '../src/ApplicationViews'
import NavBar from './components/nav/Navbar'
import Login from './components/authorization/Login'
import './App.css';

class App extends Component {
  state = {
    user: sessionStorage.getItem("credentials") !== null
  }

  // Check if credentials are in local storage --returns true/false
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  setUser = (authObj) => {

    //  For now, just store the email and password that the customer enters into local storage.
    sessionStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    this.setState({
      user: this.isAuthenticated()
    });
  }
  clearUser = () => {
    localStorage.clear()

    this.setState({
        user: this.isAuthenticated()
    });

}
  componentDidMount(){
    this.setState({
      user: this.isAuthenticated()
    })
  }

  render() {
    return (
      <>
        {this.state.user ? (
          <>
            <AppplicationViews user={this.state.user}
                        setUser={this.setUser}/>
            <NavBar user={this.state.user} clearUser={this.clearUser}/>
          </>
        ) : (
            <Login setUser={this.setUser}/>
          )}
      </>
    )
  }
}

export default App;