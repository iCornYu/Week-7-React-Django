import React, { Component } from 'react'

export default class CreatePost extends Component {
    render() {
        return (
            <form className="container border">
                <h1>Create Post</h1>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" placeholder="Title" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" name="content" rows="3"></textarea>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        )
    }
}
