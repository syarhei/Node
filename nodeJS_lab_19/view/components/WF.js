/**
 * Created by Sergei on 06.06.2017.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { cities } from '../cities/cities';

const Now = require('./Now');
const Future = require('./Future');
const Header = require('./Header');
const Cities = require('./Cities');

let userReducer = function(state = [], action) {
    if (state === undefined) {
        state = [];
    }
    if (action.type == 'CITY_ADD') {
        state = [
            ...state,
            {id: action.id, name: action.name}
        ];
        //state.push({id: action.id, name: action.name});
    }
    return state;
};

let store = createStore(userReducer, cities);

const WF = React.createClass({
    render: function () {
        console.log(store.getState());
        store.dispatch({ id: 2950159, name: 'Berlin', type: 'CITY_ADD'});
        console.log(store.getState());
        return (
            <div className="WF">
                <Now cities={store.getState()}/>
                <Future/>
            </div>
        );
    }
});

let App = () => {
    return (
        <div>
            <Header/>
            <Router>
                <div>
                    <Route exact path='/' component={WF}/>
                    <Route path='/now' render={() => (<Now cities={store.getState()}/>)}/>
                    <Route path='/future' component={Future}/>
                </div>
            </Router>
        </div>
    );
};

ReactDom.render(<App/>, document.getElementById('app'));