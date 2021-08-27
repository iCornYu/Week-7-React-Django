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
import Cart from './views/Cart';
import Login from './views/Login';
import Register from './views/Register';


export default class App extends Component {
  constructor() {
    super();
    const user = localStorage.getItem('user')
 
    if (user.search("token") !== -1) {
      const foundUser = JSON.parse(user)
      this.state = {
        cart: [],
        isLoggedIn: true,
        user: foundUser,
      }
    }
    else {
      this.state = {
        cart: [],
        isLoggedIn: false,
        user: null,
      }
    }
  }
  // componentDidMount = () => {
  //   console.log(this.state.user)
  // }

  handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value
    const password = event.target.password1.value
    const res = await fetch(`http://127.0.0.1:8000/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "username": username, "password": password })
    })
    const data = await res.json()
    const user = {
      token: data.token,
      username,
    }
    this.setState({
      isLoggedIn: true,
      user: user,
    })
    localStorage.setItem('user', JSON.stringify(user))
  }

  handleLogout = () => {
    localStorage.removeItem('user');
    this.setState({
      isLoggedIn: false,
      user: null
    })
  }

  addToCart = (product) => {
    this.setState({
      cart: this.state.cart.concat(product)
    })
  }
  removeFromCart = (product) => {
    let newCart = [...this.state.cart]
    for (let i = newCart.length - 1; i >= 0; i--) {
      if (product.product_id === newCart[i].product_id) {
        newCart.splice(i, 1);
        break
      }
    }
    this.setState({ cart: newCart })
  }



  sumTotalCart = (cartList) => {
    let total = 0;
    for (let item of cartList) {
      total += parseFloat(item.price)
    }
    return total.toFixed(2)
  }

  render() {
    return (

      <div>
        <Nav cart={this.state.cart} sumTotalCart={this.sumTotalCart} handleLogout={this.handleLogout} />

        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/about' render={() => <About my_company={this.state.company} />} />
          <Route exact path='/shop' render={() => <Shop addToCart={this.addToCart} isLoggedIn = {this.state.isLoggedIn}/>} />
          <Route exact path='/shop/:product_id' render={({ match }) => <IndividualShop match={match} addToCart={this.addToCart} isLoggedIn = {this.state.isLoggedIn}/>} />
          <Route exact path='/cart' render={() => <Cart removeFromCart={this.removeFromCart} sumTotalCart={this.sumTotalCart} cart={this.state.cart} isLoggedIn={this.state.isLoggedIn}/>} />
          {/* {
            this.state.isLoggedIn ?
              <> */}
                <Route exact path='/news' render={() => <News />} />
                <Route exact path='/students' render={() => <Students />} />
                <Route exact path='/blog' render={() => <Blog />} />
                <Route exact path='/blog/create' render={() => <CreatePost />} />
                <Route exact path='/blog/:id' render={({ match }) => <PostDetail my_match={match} />} />
                <Route exact path='/blog/update/:id' render={({ match }) => <UpdatePost my_match={match} />} />
              {/* </>
              :
              <> */}
                <Route exact path='/login' render={() => <Login handleLogin={this.handleLogin} />} />
                <Route exact path='/register' render={() => <Register />} />
              {/* </>
          } */}



        </Switch>
      </div>
    )
  }
}

