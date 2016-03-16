/**
 * Created by iivaniv on 14.03.2016.
 */
import React, { Component } from 'react';


export default class ListItem extends Component{

    render(){
        return <div className="infinite-list-item">
            List Item {this.props.key}
        </div>;
    }
}