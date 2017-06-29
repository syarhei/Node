/**
 * Created by Sergei on 12.06.2017.
 */

let userReducer = function(state = [], action) {
    if (state === undefined) {
        state = [];
    }
    if (action.type == 'CITY_ADD') {
        state = [
            ...state,
            {id: action.id, name: action.name}
        ];
        //state.push({id: action.id, name: action.name});
    }
    return state;
};

export default userReducer;