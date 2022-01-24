import React from 'react';
import { Link } from 'react-router-dom'

class NotFound extends React.Component{


    render(){
        return (
            <div>
                <h1>Page Not Found</h1>
                <p>Error 404 !</p>
                <Link to="/">Home Page</Link>
            </div>
        );
    } 
}

export default NotFound
