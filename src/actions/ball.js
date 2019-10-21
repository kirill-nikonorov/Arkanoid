import {setUpState} from '../lib/redux-actions/state'
import {moveBall} from '../lib/redux-actions/ball'
import {
    BALL_STEP_IN_CELL_COUNT
} from '../constants/game'


const toRadians = (angle) => {
    return angle * (Math.PI / 180);
};

const {cos, sin} = Math;


const cosOfDegrees = (degree) => {
    return cos(toRadians(degree))
};
const sinOfDegrees = (degree) => {
    return sin(toRadians(degree))
};


export const pushBall = () => (dispatch, getState) => {
    const {x, y, angle} = getState().ball;
    console.log(getState())

    const newStepX = BALL_STEP_IN_CELL_COUNT * cosOfDegrees(angle);
    const newStepY = BALL_STEP_IN_CELL_COUNT * sinOfDegrees(angle);

    const newX = x + newStepX;
    const newY = y + newStepY;


    console.log("newStepX = ", newStepX);
    console.log("newStepY = ", newStepY);

    dispatch(moveBall({x: newX, y: newY}));


    /*
    console.log("angle = ", angle);
    console.log("cos(angle) = ", cosOfDegrees(angle));
    console.log("newStepY = ", newStepY);*/


};
