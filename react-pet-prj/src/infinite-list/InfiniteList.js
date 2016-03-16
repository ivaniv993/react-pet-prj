/**
 * Created by iivaniv on 14.03.2016.
 *
 */

import React, { Component } from 'react';
import ListItem from './ListItem';
var Infinite = require('react-infinite-extended');
var ReactIScroll = require('react-iscroll');
var iScroll = require('iscroll');


export default class InfiniteList extends Component{

    constructor(props){
        super(props);
        console.log('constructor');
        //this.props.options = {
        //                        mouseWheel: true,
        //                        scrollbars: true
        //                     }
    }

    onScrollStart() {
        console.log("iScroll starts scrolling")
    }

    render() {
        var i = 0, len = 10, listOfLi = [];

        for(i; i < len; i++) {
            listOfLi.push(<li key={i}>Row {i+1}</li>);
        }

        let options = {
            mouseWheel: true,
            scrollbars: true
        }

        return (
            <div >
                <h1>Example of scrollable list</h1>
                <ReactIScroll iScroll={iScroll}
                              options={this.options}
                              onScrollStart={this.onScrollStart}>
                    <ul>
                        {listOfLi}
                    </ul>
                </ReactIScroll>
            </div>
        )
    }

}
