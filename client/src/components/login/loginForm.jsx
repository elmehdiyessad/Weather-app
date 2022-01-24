import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class LoginForm extends React.Component{

    state = {
        clients: [],
        email: "",
        password: "",
        error: "",
        alertDanger: "d-none",
        session: false
    }

    componentDidMount(){
        axios
            .post('/api/login/select')
            .then(response => {
                console.log(response.data)
                this.setState({ clients: response.data })
            })
            .catch(error => {
                console.log(error)
            });
            
    }


    handleChange = (e) => {
        console.log(e.target.value)
        const target = e.target
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();

        var check = false
        const clients = this.state.clients
        for(var i = 0; i < clients.length; i++) {
            // TOUT EST BON
            if(clients[i].email === this.state.email && clients[i].password === this.state.password) {
                check = true
            }
        }// fin boucle for

        if(this.state.email !== "") {
            if(this.state.password !== "") {
                
                if(check === true){
                    this.setState({ error: "" }); // vider state error
                    this.setState({ alertDanger: "d-none" })
                    localStorage.setItem('email', this.state.email)
                    localStorage.setItem('password', this.state.password)
                    this.setState({ session: true })
                    console.log("all the things right from handleSubmit method")
                    console.log(this.state)
                }else{
                    this.setState({ error: "Unvalid Email or Password" });
                    this.setState({ alertDanger: "alert alert-danger d-block" })
                    console.log("tout n'est pas bon")
                    console.log(this.state)
                }// fin email matches

                
            } else {
                this.setState({ error: "Password field is required" });
                this.setState({ alertDanger: "alert alert-danger d-block" });
                console.log(this.state)
            }// fin password
        } else {
            this.setState({ error: "Email field is required" });
            this.setState({ alertDanger: "alert alert-danger d-block" });
            console.log(this.state)
        } // fin email
        
    }



    render(){

        if(this.state.session === true){
           return <Redirect to="/" />
        }
        //console.log("local storage from login email " + localStorage.getItem("email"))
        //console.log("local storage from login password " + localStorage.getItem("password"))
        return (
            <div>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <p className="text-center"><img className="mb-4" src="images/meteo.png" align="center" alt="logo" width="100" /></p>
                    <h1 className="h3 mb-3 font-weight-normal text-center text-white">Sign in</h1>
                    {/* Alert */}
                    <div className={this.state.alertDanger} role="alert"><strong>Warning !</strong> { this.state.error }</div>

                    <div className="form-group">
                    <label className="sr-only">Email address</label>
                    <input
                    type="email"
                    name="email"
                    className="form-control" 
                    placeholder="Email address" 
                    onChange={this.handleChange}
                    />
                    </div>

                    <div className="form-group">
                    <label className="sr-only">Password</label>
                    <input 
                    type="password"
                    name="password"
                    className="form-control" 
                    placeholder="Password" 
                    onChange={this.handleChange} />
                    </div>

                    <button 
                    type="submit" 
                    className="btn btn-block btn-primary">
                    Sign in
                    </button>
                    <p className="text-center mt-2"><Link to="/register">Create an Account</Link></p>
                    <p className="mt-5 mb-3 text-white text-center"><small>&copy; METEO 2019-2020</small></p>
                </form>
            </div>
        );
    } 
}

export default LoginForm
