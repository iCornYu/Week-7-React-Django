import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import About from './views/About';
import News from './views/News';
import Students from './views/Students';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      name: "Chien Yu",
      company: "Coding Summit"

    }
  }


  render() {
    return (
      <div>
        <Nav />
  
        <Switch>
          <Route exact path='/' render={() => <Home/>}/>
          <Route exact path='/about' render={() => <About my_company={this.state.company}/>}/>
          <Route exact path='/news' render={() => <News/>}/>
          <Route exact path='/students' render={() => <Students />}/>
        </Switch>
      </div>
    )
  }
}
