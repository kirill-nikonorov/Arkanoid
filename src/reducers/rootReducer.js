import {combineReducers} from 'redux'
import {missileReducer} from "./missileReducer";
import {gameStatusReducer} from "./gameStatusReducer";
import {platformCoordinateReducer} from "./platformCoordinateReducer";
import {targetData} from "../constants/figures";
import {targetDataReducer} from "./targetDataReducer";

export const rootReducer = combineReducers({
    gameStatus: gameStatusReducer,
    platformCoordinate: platformCoordinateReducer,
    missile: missileReducer,
    target: targetDataReducer
});