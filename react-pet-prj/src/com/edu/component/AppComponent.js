import React, { Component } from 'react';
import RecordComponent from './RecordComponent';
require("./../../../resources/styles/table-styles.css");
var mock = require('mockjson');

export default class AppComponent extends Component {

    constructor(props) {
        super(props);
        console.log("Start Initial state");
        this.state = {
            flag: 'Ivaniv',
            data: [],
            records: []
        };
        //this.getProduct('http://localhost:3000/product');

        console.log("End Init state");
    }

    componentDidMount() {
        this.serverRequest = this.getProduct('http://localhost:3000/product');
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleScroll(event) {

    }


    content(data) {
        console.log("data : "+data.length);
        var records = [];
        for (var i = 0; i < data.length; i++) {
            records[i] = <RecordComponent key={i} category={data[i].category}
                                          price={data[i].price}
                                          stocked={data[i].stocked}
                                          name={data[i].name} />
        }

        this.setState({records: records});
        console.log('this.state.records : '+this.state.records.length);
    }






    getData(url){
        return new Promise( function(resolve, reject){
            let req = new XMLHttpRequest();
            req.open("GET", url );
            req.onload = function(){
                if( req.status === 200){
                    resolve(req.response);
                } else {
                    reject( new Error(req.statusText));
                }
            };

            req.onerror = function(){
                reject( new Error('Something go wrong'))
            };
            req.send();
        });
    }

    getProduct(url){
        console.log("Get product");
        this.getData(url).then(

            function(data){
                console.log('Success');
                this.state.data = JSON.parse(data);
                this.content(this.state.data);
                console.log('Length '+ this.state.data.length);
            }.bind(this),

            function(error){
                console.log("Errorr "+error);
            });
    }

    render() {

        var scrollTable = function (event) {
            var scrolled = event.scrollY;
            console.log("Scroll table px: "+scrolled);
        };

        return (
            <div id="table-wrapper">

                <div id="table-scroll" onScroll={this.handleScroll} >
                    <table  className ="lala">
                        <thead id="table-header">
                        <tr>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stocked</th>
                            <th>Name</th>

                        </tr>
                        </thead>
                        <tbody >
                        {this.state.records}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

};