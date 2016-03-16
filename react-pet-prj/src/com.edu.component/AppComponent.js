import React, { Component } from 'react';
import RecordComponent from './RecordComponent';
require("./../resources/styles/table-styles.css");
var mock = require('mockjson');

export default class AppComponent extends Component {


    constructor(props) {
        super(props);
        console.log("Start Initial state");
        this.state = {
            flag: 'Ivaniv',
            data: [
                {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
                {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
                {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
                {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
                {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
                {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
            ],
            content: function (length) {
                var records = [];
                for (var i = 0; i < length; i++) {
                    records[i] = <RecordComponent key={i} name="Ekkel" age={i*i}/>
                }
                return records;
            }

        };

        mock.data.USERNAME = ['jack', 'willian', 'jerry'];
        mock.data.GENDER = ['boy', 'girl', 'other'];

        var temp = {
            "id|+1": 1000,
            "name": "@USERNAME",
            "gender|0-1": "@GENDER",
            "vip|0-1": false
        };

        var json = mock.generate(temp);

        console.log(json);

        var userList = {
            "data|1-30": [
                {
                    "id|1000-5000": 1000,
                    "name": "@USERNAME",
                    "gender": "@GENDER",
                    "budy|0-200": ["@NUMBER"]
                }
            ]
        };

        console.log(userList);

        mock.set('http://localhost:8080/user/list', userList);


        //var tempData = [];
        //mock.get('GET/user/list' );
        //console.log(tempData);
        console.log("End Init state");
    }

    handleScroll(event) {
        console.log(event);

    }

    response(path, param, callback) {
        console.log("Before Response ");

        console.log(param);
        var result = mock.get('http://localhost:8080/user/list', {
            path: path,
            param: param
        });
        console.log("Response ");

        console.log(param);
    }

    render() {

        var scrollTable = function (event) {
            console.log(event);
            console.log(event.type);
            //var element = document.getElementsByClassName(id);
            //console.log(element);
            var scrolled = event.scrollY;
            console.log("Scroll table px: "+scrolled);
            console.log("Scroll Table ")
        };

        return (
            <div id="table-wrapper">

                <div id="table-scroll" onScroll={this.handleScroll} >
                    <table  className ="lala">
                        <thead id="table-header">
                        <tr>
                            <th>Name</th>
                            <th>Age = {this.state.flag}</th>
                        </tr>
                        </thead>
                        <tbody >
                        {this.state.content(34)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getData('http://localhost:3000/product').then( function(data){
            this.setState({data: data});
            console.log('Success');
            console.log(data);
        }.bind(this) );
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

};