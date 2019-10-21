import {movePlatformLeft, movePlatformRight} from '../lib/redux-actions/platform'
import {CELLS_HORIZONTAL_COUNT, PLATFORM_WIDTH_CELLS_COUNT} from '../constants/game'


export const pushPlatformRight = () => (dispatch, getState) => {
    const {platformCoordinate} = getState();
    if (platformCoordinate < CELLS_HORIZONTAL_COUNT - PLATFORM_WIDTH_CELLS_COUNT)
        dispatch(movePlatformRight());
};
export const pushPlatformLeft = () => (dispatch, getState) => {
    const {platformCoordinate} = getState();
    if (platformCoordinate > 0)
        dispatch(movePlatformLeft());
};
