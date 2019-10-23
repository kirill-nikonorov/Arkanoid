import {handleActions} from 'redux-actions';
import {movePlatformLeft} from '../lib/redux-actions/platform'
import {centredTargetX, targetCells, toppedTargetY} from "../constants/figures";

export const targetReducer = handleActions({

        [movePlatformLeft]: (state) => {
            return state
        }
    },
    {targetCells: targetCells, targetX : centredTargetX, targetY: toppedTargetY});





