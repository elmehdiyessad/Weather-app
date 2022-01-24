import React from 'react';
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal'; 
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CitiesList from './citylist';

class CityToAdd extends React.Component{

    state = {
        cities: [],
        show: false,
        city: "", // SELECT INPUT
        alertStyle: "alert alert-primary d-none alert-dismissible fade show",
        msg: "",
        cityId: "",
        targetToHide: null
    }

    componentDidMount(){
        // SELECT CITIES
        const data = { email: localStorage.getItem("email") }
        axios.post('/api/index/selectCities', data)
            .then(response => {
                console.log('=======> ', response)
                this.setState({ cities: response.data.cities })
            })
    }

    // MODEL CLOSE / SHOW
    handleClose = () => {
        this.setState({ show: false })
    }
    handleShow = () => {
        this.setState({ show: true })
    }


    handleChange = (e) => {
        const target = e.target
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
        console.log("value : " + value)
        console.log("state city : " + this.state.city)
    }



    // ADD CITY
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.city === ""){
            this.setState({ alertStyle: "alert alert-warning d-block alert-dismissible fade show" })
            this.setState({ msg: "Warning! Please choose a city" })
        }else{
            const data = { city: this.state.city, email: localStorage.getItem("email") }
            axios
                .post('/api/index/addcity', data)
                .then(response => {
                    console.log(response.data)
                    if(response.data.status === "SUCCESS"){

                        if(response.data.object.ok === 1){
                            this.setState({ alertStyle: "alert alert-primary d-block alert-dismissible fade show" })
                            this.setState({ msg: response.data.msg })
                            this.setState({ cities: response.data.cities })
                            console.log("CITIES STATE : ", this.state.cities)
                        }else{
                            this.setState({ alertStyle: "alert alert-warning d-none alert-dismissible fade show" })
                            console.log("ERREUR ! d'ajout dans la base de données")
                        }

                    }else if(response.data.status === "FAILED"){
                        console.log("UPDATE IS FAILED ")
                        this.setState({ alertStyle: "alert alert-warning d-block alert-dismissible fade show" })
                        this.setState({ msg: response.data.msg })
                    }
                })
                .catch(error => console.log(error))
        }
        
    }

    // UPDATE CITY ID STATE
    handleHover = (event) => {
        event.preventDefault()
        this.setState({ cityId: event.target.id })
        this.setState({ targetToHide: document.getElementById(event.target.id) })
    }
    

    // DELETE CITY
    handleDelete = (event) => {
        event.preventDefault()
        const data = { id: this.state.cityId, email: localStorage.getItem("email") }
        axios
            .post('/api/index/deletecity', data)
            .then(response => {
                console.log(response.data)
                if(response.data.status.ok === 1){
                    this.setState({ alertStyle: "alert alert-primary d-block alert-dismissible fade show" })
                    this.setState({ msg: response.data.msg })
                    
                }else{
                    this.setState({ alertStyle: "alert alert-warning d-none alert-dismissible fade show" })
                }
            })
            .catch(error => console.log(error))

        // HIDE ROW
        var btn = this.state.targetToHide
        if(btn){
            btn.parentNode.parentElement.style.display = "none"
        }
            
    }


    render(){
        return (
        <div>
            {/* CITY TO ADD */}
            <div className={this.props.cityToAddStyle}>
                <h6 align="center">ADD CITY</h6>
                <p id="city-to-add-icon" className="green pointer">
                    <i className="fas fa-plus-circle" variant="primary" onClick={this.handleShow}></i>
                </p>
                <p><img src="images/city.png" alt="city" /></p>
            </div>

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><i className="fas fa-cloud-moon-rain text-warning fa-2x"></i> &ensp; ADD CITY</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {/* BODY OF THE MODAL */}

                {/* ALERT */}
                <div className={this.state.alertStyle} role="alert">{ this.state.msg }
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                {/* FORM TO ADD NEW CITY */}
                <div className="mb-2">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        
                        <Col>
                        <Form.Control as="select" onChange={this.handleChange} name="city">
                            <option value="">Choose city...</option>
                            <option value="Paris">Paris</option>
                            <option value="Marrakech">Marrakech</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Los Angeles">Los Angeles</option>
                            <option value="Seoul">Seoul</option>
                            <option value="Lisbon">Lisbon</option>
                            <option value="Berlin">Berlin</option>
                            <option value="Rome">Rome</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Miami">Miami</option>
                            <option value="Kingdom of Thailand">Thailand</option>
                            <option value="Philippine">Philippine</option>
                            <option value="Moscow, RU">Moscow</option>
                            <option value="Canada, CA">Canada</option>
                        </Form.Control>
                        </Col>
                        <Col>
                        <Button type="submit">Add city</Button>
                        </Col>
                    </Form.Row>
                </Form>
                </div>


                { /* LIST OF CITIES */ }
                <ListGroup variant="flush">
                { 
                this.state.cities.map((item, key) => <CitiesList handleHover={this.handleHover} handleDelete={this.handleDelete} id={item._id} cityname={item.name} key={item._id}/>)
                }
                </ListGroup>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            {/* FIN CITY TO ADD */}
        </div>
        );
    } 

}
export default CityToAdd