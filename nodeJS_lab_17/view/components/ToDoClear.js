import React from 'react';

module.exports = React.createClass({
    render: function () {
        return (
            <div className="todo__clear"
                 onClick={this.props.removeCompleted}>
                Clear
            </div>
        );
    }
});