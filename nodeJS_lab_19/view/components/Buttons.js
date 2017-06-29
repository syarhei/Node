/**
 * Created by Sergei on 12.06.2017.
 */

import store from './WF';
import React from 'react';

const city1 = {type: 'CITY_ADD_SAGA', id: 2950159, name: 'Berlin'};
const city2 = {type: 'CITY_ADD_SAGA', id: 2643743, name: 'London'};

module.exports = () => {
    return (
        <div className="ButtonCity">
            <button onClick={() => { store.dispatch(city1); }} >
                berlin
            </button>
            <button onClick={() => { store.dispatch(city2); }} >
                city
            </button>
        </div>
    );
};