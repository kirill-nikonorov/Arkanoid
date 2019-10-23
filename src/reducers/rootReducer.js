import {combineReducers} from 'redux'
import {missileReducer} from "./missileReducer";
import {gameStatusReducer} from "./gameStatusReducer";
import {platformCoordinateReducer} from "./platformCoordinateReducer";
import {targetCells} from "../constants/figures";
import {targetReducer} from "./targetReducer";


export const rootReducer = combineReducers({
    gameStatus: gameStatusReducer,
    platformCoordinate: platformCoordinateReducer,
    missile: missileReducer,
    target: targetReducer
});