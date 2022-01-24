import React from 'react';

class City extends React.Component{

    handlePicture = (main) => {
        var result;
        if(main === "Clouds" || main === "Mist" || main === "Haze" || main === "Fog"){
            result = "cloudy_" 
        }else if(main === "Clear"){
            result = "sunny_" 
        }else if(main === "Rain" || main === "Drizzle"){
            result = "raining_" 
        }else if(main === "Snow"){
            result = "snowing_" 
        }else if(main === "Storm"){
            result = "storm_" 
        }

        return result
    }

    handleTemperature = (temp) => {
        temp = parseFloat(temp)
        temp = temp - 273.15
        return Math.ceil(temp)
    }

    render(){
        return (
            <>
                {/* CITY className="city align-items-center pointer city-degrade text-white" */}
                <div id="city" className={this.props.citystyle}>
                <h6 align="center">{this.props.card.name.toUpperCase()}</h6>
                    <img src={"images/"+this.handlePicture(this.props.card.weather[0].main)+this.props.img+".png"} alt="snowing" className="snowing" />
                    <small className="temperature">{ this.handleTemperature(this.props.card.main.temp) }<span className="span">°</span></small>
                    <div className="details d-flex justify-content-between">
                        {/* LEFT */}
                        <div>
                        <small className="symbole d-flex justify-content-center"><i className="fas fa-sort-down text-success"></i></small>
                        <small className="degres d-flex justify-content-center">{ this.handleTemperature(this.props.card.main.temp_min) }</small>
                        <small className="indicator text-success">MIN</small>
                        </div>
                        {/* RIGHT */}
                        <div>
                        <small className="symbole d-flex justify-content-center"><i className="fas fa-caret-up text-danger"></i></small>
                        <small className="degres d-flex justify-content-center">{ this.handleTemperature(this.props.card.main.temp_max) }</small>
                        <small className="indicator red">MAX</small>
                        </div>
                    </div>
                </div>
                {/* FIN CITY */}
            </>
        );
    }
}
export default City
