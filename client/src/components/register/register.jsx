import React from 'react';
import RegisterForm from './registerForm';

class Logout extends React.Component{

    render(){
        return (
            <div>
                <div className="container">
                <div className="row">
                <div className="col-md-4"></div>{/*  */}

                    <div className="col-md-4">
                        <RegisterForm />
                    </div>

                <div className="col-md-4"></div>{/*  */}
                </div>{/* FIN ROW */}
                </div>{/* FIN CONTAINER */}
            </div>
        );
    } 
}


export default Logout
