import React from 'react'
import CityToAdd from './citytoadd'
import City from './city'
import axios from 'axios'

class Cities extends React.Component {

constructor(){
    super()
     this.state = {
        elements: null,
        compteur: null,
        Location: [],
        cities: {} // tableau qui contient les listes de cities depuis le response.data
    }
    
}


// CALL API
componentDidMount() {
    // SELECT CITIES
    const data = { email: localStorage.getItem("email") }
    var tableau = []
    axios.post('/api/index/selectCities', data)
    .then(response => {
        this.setState({ 
            cities: response.data.cities,
            elements: response.data.cities.length + 1
        })
        for(var i = 0; i < response.data.cities.length; i++){
            var URL = "http://api.openweathermap.org/data/2.5/weather?q="+this.state.cities[i].name+"&APPID=aa0d46d27f110aae851e708ac2e918ab"
            axios.get(URL)
            .then(response => {
                // console.log("Result", response.data)
                tableau.push(response.data)
            })
            .catch(error => console.log(error))
        }
        this.setState({ Location: tableau })
        console.log(this.state.Location)
        this.setState({ compteur: this.state.elements - 3 })

    })
}



// click arrow LEFT
handleClickArrowLeft = () => {
    if (this.state.compteur > 0){
        for(var i = 0; i < this.state.elements; i++) {
            var city = document.getElementsByClassName('city')[i]
            city.style.transform += "translateX(-220px)";
            city.style.animationDuration = "1000";
            city.style.transitionProperty = "transform";
            this.setState({ compteur: this.state.compteur - 1 })
        }
    } else {
        for(i = 0; i < this.state.elements; i++){
            city = document.getElementsByClassName('city')[i]
            city.style.animationDuration = "700";
            city.style.transitionProperty = "transform";
        }
        setTimeout(function(){ city.style.transform += "translateX(-10px)"; }, 10);
        setTimeout(function(){ city.style.transform += "translateX(10px)"; }, 700);
    }
    console.log("ELEMENTS : " + this.state.elements)
    console.log("COMPTEUR : " + this.state.compteur)
}

// click arrow RIGHT
handleClickArrowRight = () => {
    if (this.state.compteur < (this.state.elements - 3)) {
        for(var i = 0; i < this.state.elements; i++){
            var city = document.getElementsByClassName('city')[i]
            city.style.transform += "translateX(220px)";
            city.style.animationDuration = "1000";
            city.style.transitionProperty = "transform";
            this.setState({ compteur: this.state.compteur + 1 })
        }
    } else {
        city = document.getElementsByClassName('city')[0]
        city.style.animationDuration = "700";
        city.style.transitionProperty = "transform";
        setTimeout(function(){ city.style.transform += "translateX(10px)"; }, 10);
        setTimeout(function(){ city.style.transform += "translateX(-10px)"; }, 700);
    }
    console.log("ELEMENTS : " + this.state.elements)
    console.log("COMPTEUR : " + this.state.compteur)
}



render(){

    return (
        <div>
        {/* ICON LEFT */}
        <div id="arrowback" className="d-flex justify-content-center green pointer" onClick={this.handleClickArrowLeft}><i className="fas fa-caret-left fa-4x arrowback"></i></div>
        {/* CITIES */}
        <div id="cities" className="d-flex align-content-stretch flex-nowrap">
        {this.state.Location.map((city, index) => {
            return (
            <div key={city.id}>
            <City key={city.id} card={city} citystyle={this.props.citystyle} img={this.props.img} />
            </div>
            )
        })}
        <CityToAdd cityToAddStyle={this.props.cityToAddStyle} isChecked={this.props.isChecked} handleclose={this.handleClose} />
        </div>{/* FIN CITIES */}
        
        {/* ICON RIGHT */}
        <div id="arrownext" className="green pointer" onClick={this.handleClickArrowRight}><i className="fas fa-caret-right fa-4x arrownext"></i></div>
        </div>
    );

}

} 
export default Cities
