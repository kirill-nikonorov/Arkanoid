import {handleActions} from 'redux-actions';
import {movePlatformLeft, movePlatformRight} from '../lib/redux-actions/platform'
import {setUpState} from '../lib/redux-actions/state'
import { centredPlatformX} from "../actions/gameStatus";

export const platformCoordinateReducer = handleActions({

        [movePlatformLeft]: (state) => {
            return state - 1
        },
        [movePlatformRight]: (state) => {
            return state + 1
        },
        [setUpState]: (platformCoordinate, {payload: {platformCoordinate: newPC}}) => {
            console.log(platformCoordinate);
            return newPC ? newPC : platformCoordinate;
        },

    },
    centredPlatformX);





