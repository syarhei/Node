import React from 'react';
const ToDoTextInput = require('./ToDoTextInput');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="todo__form">
                <ToDoTextInput
                    className="todo__text-input"
                    placeholder="I need to do..."
                    onSave={this._save}/>
            </div>
        );
    },
    _save: function (text) {
        this.props.addItem(text);
    }
});