import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

class registerForm extends React.Component{

state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: "",
    success: "",
    alertDanger: "d-none",
    alertInfo: "d-none"
}

handleChange = (e) => {
    const target = e.target
    const name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
        [name]: value
    });
}

handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.firstName === "") { 
        this.setState({error: "The first name field is required"})
        this.setState({ alertDanger: "alert alert-danger d-block" })
    }else if(this.state.lastName === "") {
        this.setState({error: "The last name field is required"})
        this.setState({ alertDanger: "alert alert-danger d-block" })
    }else if(this.state.email === "") {
        this.setState({error: "The email field is required"})
        this.setState({ alertDanger: "alert alert-danger d-block" })
    }else if(this.state.password === "") {
        this.setState({error: "The password field is required"})
        this.setState({ alertDanger: "alert alert-danger d-block" })
    }else if(this.state.passwordConfirm === "") {
        this.setState({error: "The password Confirm field is required"})
        this.setState({ alertDanger: "alert alert-danger d-block" })
    }else if(this.state.password !== this.state.passwordConfirm) {
        this.setState({error: "The password and password confirm fields not matches !"})
        this.setState({ alertDanger: "alert alert-danger d-block" })
    }else{
        axios
        .post('/api/register/add', this.state)
        .then(response => {
            console.log(response)
            if(response.data === "error"){
                this.setState({error: "The email address is already reserved please choose another one"})
                this.setState({ alertDanger: "alert alert-danger d-block" })
            }else{
                this.setState({ success: "Your Account has been created"})
                this.setState({ alertDanger: "d-none" })
                this.setState({ alertInfo: "alert alert-info d-block" })
                // vider les champs
                this.setState({ firstName: ""})
                this.setState({ lastName: ""})
                this.setState({ email: ""})
                this.setState({ password: ""})
                this.setState({ passwordConfirm: ""})
                this.setState({ error: ""})
            }
        })
        .catch(error => console.log(error))
    }
}


render(){
    return (
        <div>                
            <form onSubmit={this.handleSubmit}>
                <p className="text-center"><img className="mb-1 mt-3" src="images/meteo.png" align="center" alt="logo" width="100" /></p>
                <h1 className="h3 mb-4 font-weight-normal text-light text-center">Create an account</h1>

                {/* Alerts */}
                <div className={this.state.alertDanger} role="alert"><strong>Warning !</strong> { this.state.error }</div>
                <div className={this.state.alertInfo} role="alert"><strong>Success !</strong> { this.state.success }</div>


                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    name="firstName" 
                    placeholder="firstName" 
                    value={this.state.firstName}
                    onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input 
                    type="text"
                    className="form-control" 
                    name="lastName" 
                    placeholder="lastName" 
                    value={this.state.lastName} 
                    onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="email" 
                    className="form-control" 
                    name="email" 
                    placeholder="Email address" 
                    value={this.state.email} 
                    onChange={this.handleChange} />
                    <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    placeholder="Password" 
                    value={this.state.password} 
                    onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    className="form-control" 
                    name="passwordConfirm" 
                    placeholder="Confirm Password" 
                    value={this.state.passwordConfirm} 
                    onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className="btn btn-light ml-2" role="button">Login</Link>
            </form>
        </div>
    );
}

} // FIN CLASS

export default registerForm
