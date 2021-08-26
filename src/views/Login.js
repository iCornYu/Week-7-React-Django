import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            redirect: null,
        }
    }

    componentDidMount = ()=>{
    }

    loginAuth = async() => {
        const res = await fetch(`http://127.0.0.1:8000/api/login/`)
        const data = await res.json();
        console.log(data)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password1.value;
        console.log(username)
        console.log(password)
        event.target.username.value = '';
        event.target.password1.value = '';
        this.loginAuth()
    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/news'/>
        }
        return (
            <div className='container border border-2 px-5 py-5'>
            <h2 className="mb-4">Login</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id_username" className="form-label">Username :</label>
                    <input type="text" name="username" maxLength="150" className="form-control" id="id_username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="id_password1" className="form-label">Password :</label>
                    <input type="password" name="password1" autoComplete='new-password' maxLength="150" className="form-control" id="id_password1" />
                </div>
                <input type='submit' className='btn btn-primary mt-3' value='Submit' />
            </form>
        </div>
        )
    }
}
