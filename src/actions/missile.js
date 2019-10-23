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


const findEdges = (i) => {
    const floored = floor(i);

    if (i === floored) return [i];
    return [floored, ceil(i)]

};

export const findCoveredCellsData = (x, y) => {

    const coveredCellsXCoords = findEdges(x);
    const coveredCellsYCoords = findEdges(y);


    const coveredCells = [];
    coveredCellsXCoords.forEach(() => {
        const rowArr = [];
        coveredCellsYCoords.forEach(() => {
            rowArr.push("x")
        });
        coveredCells.push(rowArr)
    });

    return {data: coveredCells, x: floor(x), y: floor(y)};
};

const findLeftFilledCellIndex = figure => {
    const fieldWidth = figure[0].length;
    const leftIndex = figure.reduce((leftFilledCellIndex, row) => {
        const columnLeftFilledIndex = row.findIndex(cell => !!cell);
        return columnLeftFilledIndex >= 0
            ? Math.min(columnLeftFilledIndex, leftFilledCellIndex)
            : leftFilledCellIndex;
    }, fieldWidth);
    return leftIndex === fieldWidth ? -1 : leftIndex;
};
const findRightFilledCellIndex = figure => {

    const rowLength = figure.length;
    return figure.reduce((rightFilledCellIndex, row) => {
        const reversedRow = row.slice().reverse();

        const columnRightFilledCellIndex = rowLength - reversedRow.findIndex(cell => !!cell);
        return columnRightFilledCellIndex >= 0
            ? Math.max(columnRightFilledCellIndex, rightFilledCellIndex)
            : rightFilledCellIndex;
    }, -1);
};


const findEdgedFilledCellsIndexes = figure => {

    const reversedF = figure.slice().reverse();
    return ({
        bottomIndex: figure.findIndex(row => row.some(cell => !!cell)),
        topIndex: figure.length - reversedF.findIndex(row => row.some(cell => !!cell)) - 1,
        rightIndex: findRightFilledCellIndex(figure) - 1,
        leftIndex: findLeftFilledCellIndex(figure)

    })
};

const conventToTableSartingPoint = ({
                                        topIndex, bottomIndex, rightIndex, leftIndex
                                    }, x, y) =>
    ({topIndex: y + topIndex, bottomIndex: y + bottomIndex, rightIndex: x + rightIndex, leftIndex: x + leftIndex});

export const pushMissile = () => (dispatch, getState) => {
    const state = getState();
    const {missile: {x, y, angle}, target: {targetCells, targetX, targetY}} = state;

    let newX = x,
        newY = y,
        newAngle = angle;

    const addToMainParams = (x, y, angle = newAngle) => {
        newX += x;
        newY += y;
        newAngle = angle;
    };

    const checkAreCellsAreBusy = ({data}) => {

        const targetEdgesFroTargetSartingPoint = findEdgedFilledCellsIndexes(targetCells);
        const targetEdgesFroTableSartingPoint = conventToTableSartingPoint(targetEdgesFroTargetSartingPoint, targetX, targetY)


        console.log(targetEdgesFroTableSartingPoint)
        /*

                const results = []


                cells.forEach(({x, y}) => {

                    const xTargetCell = x - targetX;
                    const yTargetCell = y - targetY;

                    const areOnTheSameLevel = xTargetCell > 0 && yTargetCell > 0;

                    if (!areOnTheSameLevel) return;

                    console.log("areOnTheSameLevel")

                    const isCellBusy = targetCells[yTargetCell][xTargetCell];


                    results.push({x, y, haveConflict, isCellBusy})


                    /!*const yAbsoluteTargetCell = yTargetCell + targetX;

                    if (x === xAbsoluteTargetCell && y === yAbsoluteTargetCell) console.log(cells[3])*!/


                });

                console.log(results);
        */


    };


    const handlePossiblePieceOfStep = (stepLength, x, y, angle) => {

        const hypotheticalNewX = computeNewBallCoordinate(x, stepLength, toRoundCos(angle));
        const hypotheticalNewY = computeNewBallCoordinate(y, stepLength, toRoundSin(angle));
//
        const coveredCellsData = findCoveredCellsData(hypotheticalNewX, hypotheticalNewY);
        checkAreCellsAreBusy(coveredCellsData);

//
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
