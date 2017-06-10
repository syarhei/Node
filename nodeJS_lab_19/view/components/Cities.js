/**
 * Created by Sergei on 10.06.2017.
 */

import React from 'react';

module.exports = React.createClass({
    render: function () {
        let state = this.props.cities;
        let cities = state.getState();
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
            </div>
        );
    }
});