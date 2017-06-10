/**
 * Created by Sergei on 09.06.2017.
 */

import React from 'react';

module.exports = React.createClass({
    render: function () {
        return (
            <div className="Info">
                <table >
                    <tr>
                        <td>
                            <label id="currentMin"/>
                        </td>
                        <td>
                            <label id="currentMax"/>
                        </td>
                        <td>
                            <label id="currentTemp"/>
                        </td>
                        <td>
                            <label id="currentCloud"/>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
});