import React from 'react';
import { Link } from 'react-router-dom';


const Preview = ({ id, title, author, time, description }) => (
    
    <div className="content-container post" >
        <Link to={`/${id}`}>
        <h2>{title} <i className="author">by {author}</i></h2>
        </Link>
        <i className="time">{time}</i>
        <p>{description}</p>
    </div>
    
);

export default Preview;