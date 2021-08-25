import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import About from './views/About';
import News from './views/News';
import Students from './views/Students';
import Blog from './views/Blog';
import PostDetail from './views/PostDetail';
import CreatePost from './views/CreatePost';
import UpdatePost from './views/UpdatePost';
import Shop from './views/Shop';
import IndividualShop from './views/IndividualShop';


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
          <Route exact path='/blog' render={() => <Blog />}/>
          <Route exact path='/blog/create' render={() => <CreatePost />}/>
          <Route exact path='/blog/:id' render={({match}) => <PostDetail my_match={match}/>}/>
          <Route exact path='/blog/update/:id' render={({match}) => <UpdatePost my_match={match}/>}/>
          <Route exact path='/shop' render={() => <Shop />}/>
          <Route exact path='/shop/:product_id' render={({match}) => <IndividualShop match={match}/>}/>

        </Switch>
      </div>
    )
  }
}
