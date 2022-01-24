import React from 'react'
import Menu from './menu'
import Cities from './cities'
import { Redirect } from 'react-router-dom';

class Index extends React.Component{

    state = {
        LondonApi: [],
        session: true,
        isChecked: true,
        menuStyle: "bg-purple navbar navbar-dark text-white d-flex align-items-center",
        cityStyle: "city align-items-center pointer city-degrade text-white d-block",
        cityToAddStyle: "city city_to_add align-content-center pointer city-degrade text-white",
        img: "dark"
    }


    handleChange = (e) => {
        this.setState({
          isChecked: !this.state.isChecked
        });

        let body = document.body;
        if (!this.state.isChecked) {
            body.style.backgroundImage = "linear-gradient(#958CAC, #2E2055)";
            body.style.backgroundPosition = "center";
            body.style.backgroundAttachment = "fixed";
            body.style.backgroundSize = "cover";
            body.style.backgroundRepeat = "no-repeat";
            this.setState({ cityStyle: "city align-items-center pointer city-degrade text-white" }); //
            this.setState({ cityToAddStyle: "city city_to_add align-content-center pointer city-degrade text-white" }); //
            this.setState({ menuStyle: "bg-purple navbar navbar-dark text-white d-flex align-items-center" }); //
            this.setState({ img: "dark"})
        } else {
            document.body.style.background = "white";
            this.setState({ cityStyle: "city align-items-center pointer bg-white text-dark" }); //
            this.setState({ cityToAddStyle: "city city_to_add align-content-center pointer bg-white text-dark" }); //
            this.setState({ menuStyle: "bg-white text-dark navbar navbar-dark text-white d-flex align-items-center" }); //
            this.setState({ img: "light"})
        }
    
    }

    disconnect = () => {
        localStorage.setItem('email', null)
        localStorage.setItem('password', null)
        console.log("EMAIL : " + localStorage.getItem('email'))
        console.log("PASSWORD : " + localStorage.getItem('password'))
        this.setState({ session: false })
    }
    

    render(){

        if(localStorage.getItem("email") === "null" || this.state.session === false){
            return <Redirect to="/login" />
        }
        
        return (
            <div>
                <div id="menu">
                </div>{/* MENU */}
                <Menu isChecked={this.state.isChecked} menustyle={this.state.menuStyle} disconnect={this.disconnect} handleChange={this.handleChange}/>
                {/* BODY */}
                <div className="container-fluid">
                <div className="container">
                <div className="row">
                <div className="col-md-12">
                
                <div id="conteneur" className="d-flex align-items-center justify-content-center mt-5">
                    <Cities isChecked={this.state.isChecked} cityToAddStyle={this.state.cityToAddStyle} citystyle={this.state.cityStyle} img={this.state.img} />
                </div>{/* FIN CONTENEUR */}

                </div>{/* col-md-12 */}
                </div>{/* FIN ROW */}
                </div>{/* FIN CONTAINER */}
                </div>{/* CONTAINER FLUID */}

            </div>
        );
    }
}


export default Index
