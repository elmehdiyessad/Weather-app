import React from 'react'
import LoginForm from './loginForm'

class Login extends React.Component{

    render(){
        return (
            <div>                      
                <div className="container">
                <div className="row mt-5">
                <div className="col-md-4"></div>{/* */}

                    <div id="formulaire" className="col-md-4">
                        <LoginForm />
                    </div>

                <div className="col-md-4"></div>{/* */}
                </div>{/* FIN ROW */}
                </div>{/* FIN CONTAINER */}
            </div>
        );
    } 
}


export default Login
