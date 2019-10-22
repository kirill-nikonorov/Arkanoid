import {combineReducers} from 'redux'
import {missileReducer} from "./missileReducer";
import {gameStatusReducer} from "./gameStatusReducer";
import {platformCoordinateReducer} from "./platformCoordinateReducer";

export const rootReducer = combineReducers({
    gameStatus: gameStatusReducer,
    platformCoordinate: platformCoordinateReducer,
    missile: missileReducer
});