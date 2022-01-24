import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class CitiesList extends React.Component{

render(){
    // console.log("ID FROM PROPS ", this.props.id)
    // console.log("NAME FROM PROPS ", this.props.cityname)
    return (
    <div>
        <ListGroup.Item variant="d-flex flex-nowrap"><strong>{ this.props.cityname }</strong>
            <Button variant="light text-primary stuck-right" size="sm" id={this.props.id} onClick={this.props.handleDelete} onMouseEnter={this.props.handleHover}><i className="far fa-trash-alt"></i></Button>
        </ListGroup.Item>
    </div>
    );
} 


}
export default CitiesList