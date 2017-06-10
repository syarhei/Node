/**
 * Created by Sergei on 06.06.2017.
 */

import React from 'react';
const Info = require('./Info');
const api = require('../api/api')();

module.exports = React.createClass({
    render: function () {
        let cities = this.props.cities;
        let object = cities.map((city) => {
            return (
                <div key={city.id}>
                    <label>{city.id} and {city.name}</label>
                    <button value={city} onClick={() => {this.onButtonClick(city)}}>info</button>
                    <br/>
                </div>
            );
        });
        return (
            <div className="Now">
                {object}
                <Info/>
            </div>
        );
    },
    onButtonClick: (options) => {
        api.getCurrentWeather(options.id).then((array) => {
            document.getElementById('currentMin').innerHTML = array.data.main.temp_min;
            document.getElementById('currentMax').innerHTML = array.data.main.temp_max;
            document.getElementById('currentTemp').innerHTML = array.data.main.temp;
            document.getElementById('currentCloud').innerHTML = array.data.weather[0].description;
        }).catch(console.log);
    }
});