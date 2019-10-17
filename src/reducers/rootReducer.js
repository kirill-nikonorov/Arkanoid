import {handleActions} from 'redux-actions';
import {movePlatformLeft, movePlatformRight} from '../lib/redux-actions/table'

export const rootReducer = handleActions({
        [movePlatformLeft]: (state) => {
            const {platformCoordinate} = state;
            return {...state, platformCoordinate: platformCoordinate - 1}
        },
        [movePlatformRight]: (state) => {
            const {platformCoordinate} = state;
            return {...state, platformCoordinate: platformCoordinate + 1}
        },

    },
    {platformCoordinate: 0});
