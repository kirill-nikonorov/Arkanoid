import {moveMissile} from '../lib/redux-actions/missile'
import {
    MISSILE_SIDE_IN_CELLS,
    MISSILE_STEP_IN_CELLS, CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT
} from '../constants/game'
import {checkIsWithinAllBounds} from "../utils/boundComplianceCheck";
import {
    findCathetuses, findHypotenuseFromFarCathetus, findHypotenuseFromNearCathetus,
    putAngleInOrder, toRoundCos, toRoundSin
} from "../utils/trigonometricFunctions";

const {min, abs, floor, ceil} = Math;


const findCoveredCells = (x, y) => {

    const coveredCellsXCoords = [floor(x), ceil(x)];
    const coveredCellsYCoords = [floor(y), ceil(y)];


    const coveredCells = [];
    coveredCellsXCoords.forEach((x) => {
        coveredCellsYCoords.forEach(y => {
            coveredCells.push({x, y})
        })
    });

    return coveredCells;


};


export const pushMissile = () => (dispatch, getState) => {
    const state = getState();
    const {missile: {x, y, angle}, target: {targetData, targetX, targetY}} = state;

    let newX = x,
        newY = y,
        newAngle = angle;

    const addToMainParams = (x, y, angle = newAngle) => {
        newX += x;
        newY += y;
        newAngle = angle;
    };


    const checkAreCellsAreBusy = (cells) => {

        const {x, y} = cells[3];


        targetData.forEach(({x: xTargetCell, y: yTargetCell}) => {
            const xAbsoluteTargetCell = xTargetCell + targetX;
            const yAbsoluteTargetCell = yTargetCell + targetX;

            if (x === xAbsoluteTargetCell && y === yAbsoluteTargetCell) console.log(cells[3])


        })


    };


    const handlePossiblePieceOfStep = (stepLength, x, y, angle) => {

        const hypotheticalNewX = computeNewBallCoordinate(x, stepLength, toRoundCos(angle));
        const hypotheticalNewY = computeNewBallCoordinate(y, stepLength, toRoundSin(angle));

        const coveredCells = findCoveredCells(hypotheticalNewX, hypotheticalNewY);
        checkAreCellsAreBusy(coveredCells);


        if (checkIsWithinAllBounds(hypotheticalNewX, hypotheticalNewY)) {

            const [xChange, yChange] = findCathetuses(stepLength, angle);
            addToMainParams(xChange, yChange)
        }
        else {
            const xDistanceBeforeXCrush = findXDistanceBeforeXCrush(x, angle);
            const yDistanceBeforeYCrush = findYDistanceBeforeYCrush(y, angle);

            const distanceBeforeXCrush = abs(findHypotenuseFromNearCathetus(xDistanceBeforeXCrush, angle));
            const distanceBeforeYCrush = abs(findHypotenuseFromFarCathetus(yDistanceBeforeYCrush, angle));

            const distanceBeforeTheNearestCrush = min(distanceBeforeXCrush, distanceBeforeYCrush);

            const [xChange, yChange] = findCathetuses(distanceBeforeTheNearestCrush, angle);

            addToMainParams(
                xChange,
                yChange,
                findNewAngle(distanceBeforeXCrush, distanceBeforeYCrush, angle)
            );

            const leftStepLength = stepLength - distanceBeforeTheNearestCrush;
            if (leftStepLength > 0) {
                handlePossiblePieceOfStep(leftStepLength, newX, newY, newAngle)
            }
        }
    };

    handlePossiblePieceOfStep(MISSILE_STEP_IN_CELLS, x, y, angle);

    dispatch(moveMissile({x: newX, y: newY, angle: newAngle}))
};

const computeNewBallCoordinate = (coordinate, stepDistance, stepRelation) => {
    return coordinate + stepDistance * stepRelation;
};


const findNewAngle = (distanceBeforeXCrush, distanceBeforeYCrush, angle) => {

    if (distanceBeforeYCrush === distanceBeforeXCrush) return putAngleInOrder(180 - angle);

    const crushIsWithHorizontalBoard = distanceBeforeXCrush < distanceBeforeYCrush;

    const newAngle = crushIsWithHorizontalBoard ? 180 - angle : 360 - angle;

    return putAngleInOrder(newAngle);
};


const findXDistanceBeforeXCrush = (x, angle) => {
    const missileMoveVertically = angle === 90 || angle === -90;
    if (missileMoveVertically) return Infinity;

    const missileMoveToTheRight = 90 > angle && angle > -90;

    return missileMoveToTheRight ? findFreeSpaceOnTheRight(x) : x;
};

const findYDistanceBeforeYCrush = (y, angle) => {

    const missileMoveHorizontally = angle === 0 || angle === 180;
    if (missileMoveHorizontally) return Infinity;

    const missileMoveToTheTop = 0 < angle && angle < 180;

    return missileMoveToTheTop ? findFreeSpaceOnTheTop(y) : y;
};

const findFreeSpaceOnTheRight = (x) => {
    return CELLS_HORIZONTAL_COUNT - MISSILE_SIDE_IN_CELLS - x;
};
const findFreeSpaceOnTheTop = (y) => {
    return CELLS_VERTICAL_COUNT - MISSILE_SIDE_IN_CELLS - y;
};
