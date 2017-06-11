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
                <div className="LabelInfo">
                    <label>CURRENT WEATHER</label>
                </div>
                {object}
                <Info/>
            </div>
        );
    },
    onButtonClick: (options) => {
        api.getCurrentWeather(options.id).then((array) => {
            document.getElementById('th1').innerHTML = 'min';
            document.getElementById('th2').innerHTML = 'max';
            document.getElementById('th3').innerHTML = 'current';
            document.getElementById('th4').innerHTML = 'description';
            document.getElementById('td1').innerHTML = array.data.main.temp_min;
            document.getElementById('td2').innerHTML = array.data.main.temp_max;
            document.getElementById('td3').innerHTML = array.data.main.temp;
            document.getElementById('td4').innerHTML = array.data.weather[0].description;
        }).catch(console.log);
    }
});