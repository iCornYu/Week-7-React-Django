import React, { Component } from 'react'
import Studentpost from '../components/Studentpost';

export default class Students extends Component {
    constructor() {
        super();
        this.state = {
            students: []
        }
    }
    
    componentDidMount=()=> {
        this._isMounted = true; 
        fetch("https://shohablog-django.herokuapp.com/api/")
            .then(res => res.json())
            .then(data => {
                for(let i = 0; i<data.students.length;i++){
                    data.students[i].index = i+1
                }
                this.setState({
                    students: data.students
                })
            })
            .catch(error => console.log(error))
    }
    
    render() {
        return (
            <div className="container">
                <div>
                    <h1 className="text-center pt-5">List of students in Coding Summit</h1>
                </div>
                <div className="row">
                    {this.state.students.map((s,i) => <Studentpost student={s} key={i} />)}
                </div>
            </div>
        )
    }
}
