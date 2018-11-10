import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Post extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    }

    componentDidMount() {
        const id = this.props.location.pathname.split('/').slice(-1)[0];
        axios.get(`/__/${id}`).then((response) => {
            let data = response.data;
            this.setState({data});
        });
    }

    content() {
        console.log(this.state.data);
    }

    render() {
        return (
            <div className="content-container" >
                <br />
                {
                    this.state.data[0] ?
                    <div>
                    <div className="post">
                    <h2>{this.state.data[0].title} <i className="author">by {this.state.data[0].author}</i></h2>
                    </div>
                    <i className="time">{this.state.data[0].date.split('T')[0]}</i>
                    <br /><b>{this.state.data[0].description}</b>
                    <p>{this.state.data[0].text}</p>
                    </div>
                    :
                    <p>404 Post not found!</p>
                }
            </div>
        );}
    }

export default Post;