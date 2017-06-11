/**
 * Created by Sergei on 06.06.2017.
 */

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { cities } from '../cities/cities';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga/middleware';

const Now = require('./Now');
const Future = require('./Future');
const Header = require('./Header');
const Cities = require('./Cities');

const city1 = {type: 'CITY_ADD_SAGA', id: 2950159, name: 'Berlin'};
const city2 = {type: 'CITY_ADD_SAGA', id: 2643743, name: 'London'};

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

const sagaMiddleware = createSagaMiddleware();

let store = createStore(userReducer, cities, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({type});

const WF = React.createClass({
    render: function () {

        return (
            <div className="WF">
                <button onClick={() => { store.dispatch(city1); }} >
                    berlin
                </button>
                <button onClick={() => { store.dispatch(city2); }} >
                    city
                </button>
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

function render() {
    ReactDom.render(<App/>, document.getElementById('app'));
}

render();
store.subscribe(render);

export default store;