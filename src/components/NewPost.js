import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class NewPost extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/__/post', {
            "title": e.target.title.value,
            "author": e.target.author.value,
            "description": e.target.description.value,
            "text": e.target.text.value
        })
        .then((res) => {
            this.props.history.push('/');
        })
        .catch((err) => {
            alert("Couldn't post right now. Sorry for the inconvenience!");
        })
    }

    render() {
        return (
            <div className="content-container">
                <br />
                <form onSubmit={this.onSubmit} autoComplete="off">
                    <div><input className="text-input" name="title" placeholder="Enter title" required/></div>
                    <div><input className="text-input" name="author" placeholder="Enter your name" required/></div>                   
                    <div><input className="text-input" name="description" placeholder="Enter description" required/></div>
                    <div><textarea className="textarea" name="text" placeholder="Start writing" required/></div>
                    <div><center><button className="button">Post</button></center></div>
                </form>
            </div>
        )
    }
}

export default NewPost;