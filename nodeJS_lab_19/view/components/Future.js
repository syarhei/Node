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
            <div className="Future">
                <div className="LabelInfo">
                    <label>FUTURE WEATHER</label>
                </div>
                {object}
                <Info/>
            </div>
        );
    },
    onButtonClick: (options) => {
        api.getFutureWeather(options.id).then((array) => {
            document.getElementById('th1').innerHTML = array.data.list[0].dt_txt;
            document.getElementById('th2').innerHTML = array.data.list[3].dt_txt;
            document.getElementById('th3').innerHTML = array.data.list[6].dt_txt;
            document.getElementById('th4').innerHTML = array.data.list[9].dt_txt;
            document.getElementById('td1').innerHTML = array.data.list[0].main.temp;
            document.getElementById('td2').innerHTML = array.data.list[3].main.temp;
            document.getElementById('td3').innerHTML = array.data.list[6].main.temp;
            document.getElementById('td4').innerHTML = array.data.list[9].main.temp;
        }).catch(console.log);
    }
});