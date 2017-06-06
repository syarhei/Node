import React from 'react';
import ReactDOM from 'react-dom';
import ReactConfirmAlert, {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ToDoModel = require('../models/ToDoModel');
const NavModel = require('../models/NavModel');
const ToDoSummary = require('./ToDoSummary');
const ToDoList = require('./ToDoList');
const ToDoForm = require('./ToDoForm');
const ToDoClear = require('./ToDoClear');
const Nav = require('./Nav');

const todoModel = new ToDoModel();
const navModel = new NavModel();

const ToDo = React.createClass({
    render: function () {
        return (
            <div className="todo">
                <div className="todo__title">React ToDo</div>
                <Nav links={this.state.links} activeLink={this.state.activeLink}
                     navigate={this._navigate}/>
                <ToDoSummary remains={this.state.remains} completed={this.state.completed}/>
                <ToDoList tasks={this.state.tasks} areAllComplete={this.state.areAllCompleted}
                          toggleItem={this._toggleItem} toggleAll={this._toogleAll}
                          removeItem={this._removeItem} updateItem={this._updateItem}
                />
                <ToDoForm addItem={this._addItem}/>
                <ToDoClear removeCompleted={this._removeCompleted}/>
            </div>
        );
    },
    getInitialState: function () {
        return this._getState();
    },
    _getState: function () {
        const state = {
            remains: todoModel.getActiveCount(),
            completed: todoModel.getCompletedCount(),
            links: navModel.getLinks(),
            activeLink: navModel.getActive()
        };
        state.areAllCompleted = state.remains === 0;
        if (state.activeLink.title === 'All') {
            state.tasks = todoModel.getItems();
        } else if (state.activeLink.title === 'Completed') {
            state.tasks = todoModel.getCompletedItems();
        } else {
            state.tasks = todoModel.getActiveItems();
        }
        return state;
    },
    _rerender: function () {
        this.setState(this._getState());
    },
    _toggleItem: function (id) {
        todoModel.toggleItem(id)
            .then(() => todoModel.syncItems())
            .then(() => this._rerender());
    },
    _toogleAll: function () {
        todoModel.switchAllTo(!this.state.areAllCompleted)
            .then(() => todoModel.syncItems())
            .then(() => this._rerender());
    },
    _removeItem: function (id) {
        confirmAlert({
            title: 'Attention!',
            message: 'Are you sure you want to delete this task?',
            confirmLabel: 'Yes',
            cancelLabel: 'No',
            onConfirm: () => {
                todoModel.removeItem(id)
                    .then(() => todoModel.syncItems())
                    .then(() => this._rerender());
            }
        });
    },
    _addItem: function (text) {
        todoModel.addItem(text)
            .then(() => {
                toast.success('New task successfully added!');
                return todoModel.syncItems();
            })
            .then(() => this._rerender())
            .catch(() => toast.error('An error occurred while adding a new task.'));
    },
    _updateItem: function (id, text) {
        todoModel.updateItem(id, text)
            .then(() => todoModel.syncItems())
            .then(() => this._rerender());
    },
    _removeCompleted: function () {
        todoModel.removeCompleted()
            .then(() => todoModel.syncItems())
            .then(() => this._rerender());
    },
    _navigate: function (link) {
        navModel.setActive(link);
        this._rerender();
    },
    componentDidMount: function () {
        todoModel.syncItems()
            .then(() => this._rerender());
    }
});

const App = () => {
    return (
        <div>
            <ToDo/>
            <ToastContainer />
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('app'));