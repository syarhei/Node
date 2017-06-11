/**
 * Created by Sergei on 11.06.2017.
 */

import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import store from '../components/WF';
//import { delay } from 'redux-saga';

/*function checkState(action) {
    return new Promise((resolve, reject) => {
        action.name = 'Berlin2';
        console.log(action);
        console.log(store.getState());
        let cities = store.getState();
        let is = false;
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].id == action.id) is = true;
        }
        console.log(is);
        if (is == true)
            action = { type: 'error' };
        console.log(action);
        resolve(action);

    })
}*/
/*
 action.name = 'Berlin2';
 let cities = store.getState();
 let is = false;
 for (let i = 0; i < cities.length; i++) {
 if (cities[i].id == action.id) is = true;
 }
 yield call(delay, 5000);
 if (is == true)
 yield put({type: 'CITY_ERROR'});
 else yield put(action);
 if (is == true)
 yield put({type: 'CITY_ERROR'});
 else yield put(action);
 */
//yield put({type: 'CITY_ADD', id: 2950159, name: 'Berlin'});
//yield put({type: 'CITY_ERROR'});
//yield call(delay, 1000);
/*const cities = yield call(function() {
 return new Promise(function(resolve, reject) {
 let cities_ = store.getState();
 resolve(cities_);
 });
 });
 let is = false;
 for (let i = 0; i < cities.length; i++) {
 if (cities[i].id == action.id) yield put({type: 'CITY_ERROR'});
 }*/

function checkStore(action) {
    return new Promise((resolve, reject) => {
        let cities = store.getState();
        for (let city in cities) {
            if (cities[city].id == action.id)
                resolve({type: 'CITY_ERROR'});
        }
        resolve(action);
    })
}

export function* fetchData(action) {
    console.log('test2');
    const result = yield call(() => checkStore(action));
    if (result.type == 'CITY_ERROR')
        yield put({type: result.type});
    else if (action.name == 'Berlin')
        yield put({type: 'CITY_ADD', id: action.id, name: action.name});
    else yield put({type: 'CITY_ADD', id: action.id, name: 'city'});
}

export default function* rootSaga() {
    console.log('test1');
    yield takeEvery('CITY_ADD_SAGA', fetchData);
}