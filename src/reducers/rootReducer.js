import {combineReducers} from 'redux'
import {ballReducer} from "./ballReducer";
import {gameStatusReducer} from "./gameStatusReducer";
import {platformCoordinateReducer} from "./platformCoordinateReducer";

export const rootReducer = combineReducers({
    gameStatus: gameStatusReducer,
    platformCoordinate: platformCoordinateReducer,
    ball: ballReducer
});