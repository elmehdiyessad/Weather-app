import React from 'react';

class Menu extends React.Component{


    render(){
        return (
            <div>
            {/* FIN MENU */}
                <nav className={this.props.menustyle}>
                    <div className="d-flex justify-content-start">
                    <button className="navbar-toggler" type="button" onClick={this.props.disconnect}><span className="navbar-toggler-icon"></span></button>
                        <img src="images/meteo.png" alt="meteo" className="ml-3" width="40" height="40" />
                        <span className="ml-3 mt-2 font-weight-bold align-middle">Minimis</span>
                    </div>   
                    <div className="d-flex justify-content-center mr-5"><span className="text-center font-weight-bold">TODAY</span></div>
                    <div className="material-switch pull-right">

                    <small className="text-muted mr-3">LIGHT</small>
                        <input type="checkbox" id="checkbox" defaultChecked={this.props.isChecked} onChange={this.props.handleChange}/>
                        <label htmlFor="checkbox" className="label-danger"></label>
                    <small className="text-muted ml-3">DARK</small>
                    
                    </div>
                </nav>
            {/* FIN MENU */}
            </div>
        );
    } 
}

export default Menu
