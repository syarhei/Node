/**
 * Created by Sergei on 09.06.2017.
 */

import axios from 'axios';

module.exports = () => {
    function Api() {
        this.getCurrentWeather = getCurrentWeather;

        function getCurrentWeather(id) {
            return new Promise((resolve, reject) => {
                axios.get('http://api.openweathermap.org/data/2.5/weather?appid=900ef9b8e3d5948c8a16df01f60e1049&id=' + id.toString()).then(array => {
                    resolve(array);
                }).catch(console.log);
            });
        }
    }

    return new Api();
};

