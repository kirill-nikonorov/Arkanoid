import {handleActions} from 'redux-actions';
import {movePlatformLeft} from '../lib/redux-actions/platform'
import {centredTargetX, targetData, toppedTargetY} from "../constants/figures";

export const targetDataReducer = handleActions({

        [movePlatformLeft]: (state) => {
            return state
        }
    },
    {targetData, targetX : centredTargetX, targetY: toppedTargetY});





