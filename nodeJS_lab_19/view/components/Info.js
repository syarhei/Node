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
                        <th>
                            <label id="th1"/>
                        </th>
                        <th>
                            <label id="th2"/>
                        </th>
                        <th>
                            <label id="th3"/>
                        </th>
                        <th>
                            <label id="th4"/>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <label id="td1"/>
                        </td>
                        <td>
                            <label id="td2"/>
                        </td>
                        <td>
                            <label id="td3"/>
                        </td>
                        <td>
                            <label id="td4"/>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
});