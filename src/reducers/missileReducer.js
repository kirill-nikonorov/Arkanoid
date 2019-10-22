import {handleActions} from 'redux-actions';
import {setUpState} from '../lib/redux-actions/state'
import {moveMissile} from '../lib/redux-actions/missile'
import {missileOnPlatformY, centredMissileX} from "../actions/gameStatus";


export const missileReducer = handleActions({
        [moveMissile]: (state, {payload}) => {
            return {...state, ...payload}
        },

        [setUpState]: (state, {payload: {missile}}) => {
            return {...state, ...missile}
        },
    },
    {x: centredMissileX, y: missileOnPlatformY, angle: 45});

