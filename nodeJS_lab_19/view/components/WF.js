/**
 * Created by Sergei on 06.06.2017.
 */

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga/middleware';
import { cities } from '../cities/cities';
import userReducer from '../redux/reducer';

const Now = require('./Now');
const Future = require('./Future');
const Header = require('./Header');
const Cities = require('./Cities');
const Buttons = require('./Buttons');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(userReducer, cities, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const WF = React.createClass({
    render: function () {
        return (
            <div className="WF">
                <Buttons/>
                <Now cities={store.getState()}/>
                <Future cities={store.getState()}/>
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
                    <Route path='/future' render={() => (<Future cities={store.getState()}/>)}/>
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