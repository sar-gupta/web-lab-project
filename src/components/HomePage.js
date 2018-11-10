import React from 'react';
import { Link } from 'react-router-dom';
import Preview from './Preview';
import axios from 'axios';

class HomePage extends React.Component{ 
    constructor() {
        super();
        this.state = { data: [] };
    }

    componentDidMount() {
        axios.get('/__/previews').then((response) => {
            // console.log(response.data);
            let data = response.data;
            this.setState({data});
        });
    }

    render() {
        return (
            <div>
                
                <br />
                <div className="content-container">
                    <h2>Created By : Sarthak Gupta</h2>
                </div>
                <br />
                
                {
                    this.state.data.reverse().map(data => {
                        console.log(data)
                        let prop = {id:data.id, title: data.title, author: data.author,time: data.date.split('T')[0], description: data.description};
                        return <Preview {...prop} />
                    })
                }
            </div>
        );}
}

export default HomePage;
