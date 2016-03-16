import React, { Component } from 'react';


export default class RecordComponent extends Component {
	
	render(){
		return ( <tr><td>{this.props.name}</td><td>{this.props.age}</td></tr>);
	}
}