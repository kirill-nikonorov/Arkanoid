import {setUpState} from '../lib/redux-actions/state'
import {
    CELLS_HORIZONTAL_COUNT, GAME_STATUSES,
    PLATFORM_WIDTH_CELLS_COUNT,
} from '../constants/game'
import {checkIsGameOnPause, checkIsGameOn, checkIsTurnedOff} from '../utils/gameStatusCheckers'
import {turnOnGame, pauseGame} from '../lib/redux-actions/gameStatus'

export const centredPlatformX = Math.round((CELLS_HORIZONTAL_COUNT - PLATFORM_WIDTH_CELLS_COUNT) / 2)
export const centredBallX = Math.round((CELLS_HORIZONTAL_COUNT) / 2);
export const ballOnPlatformY = 1;

const initialState = {
    platformCoordinate: centredPlatformX,
    ball: {x: centredBallX, y: ballOnPlatformY},
    gameStatus: GAME_STATUSES.GAME_IS_ON
}
;

export const startNewGame = () => (dispatch) => {

    dispatch(setUpState(initialState));
};

export const toggleGameOn = () => (dispatch, getState) => {
    const {gameStatus} = getState();
    if (checkIsGameOnPause(gameStatus) || checkIsTurnedOff(gameStatus)) dispatch(turnOnGame());
    else if (checkIsGameOn(gameStatus)) dispatch(pauseGame())

};

