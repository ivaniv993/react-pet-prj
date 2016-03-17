import React, { Component } from 'react';


export default class RecordComponent extends Component {
	
	render(){
		return ( <tr><td>{this.props.category}</td>
					<td>{this.props.price}</td>
					<td>{this.props.stocked}</td>
					<td>{this.props.name}</td></tr>);
	}
}