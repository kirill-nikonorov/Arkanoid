import {handleActions} from 'redux-actions';
import {setUpState} from '../lib/redux-actions/state'
import {moveBall} from '../lib/redux-actions/ball'
import {ballOnPlatformY, centredBallX} from "../actions/gameStatus";


export const ballReducer = handleActions({
        [moveBall]: (state, {payload}) => {
            return {...state, ...payload}
        },

        [setUpState]: (state, {payload: {ball}}) => {
            return {...state, ...ball}
        },
    },
    {x: centredBallX, y: ballOnPlatformY, angle: 45});

