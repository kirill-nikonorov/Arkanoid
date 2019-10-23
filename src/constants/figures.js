import {
    CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT, MISSILE_SIDE_IN_CELLS, PLATFORM_HEIGTH_CELLS_COUNT,
    PLATFORM_WIDTH_CELLS_COUNT,
    TARGET_HEIGHT_CELLS, TARGET_WIDTH_CELLS
} from "./game";

const createFilledArray = (rowCount, columnCount) => {
    const array = [];
    for (let y = 0; y < rowCount; y++) {
        const rowArray = [];
        for (let x = 0; x < columnCount; x++) {
            rowArray.push('x');
        }

        array.push(rowArray)

    }
    return array;
};


export const tableBackgroundCells = createFilledArray(CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT);

export const platformCells = createFilledArray(PLATFORM_HEIGTH_CELLS_COUNT, PLATFORM_WIDTH_CELLS_COUNT);

export const missileCells = createFilledArray(MISSILE_SIDE_IN_CELLS, MISSILE_SIDE_IN_CELLS);

export const targetCells = createFilledArray(TARGET_HEIGHT_CELLS, TARGET_WIDTH_CELLS);

export const centredTargetX = Math.round((CELLS_HORIZONTAL_COUNT - TARGET_WIDTH_CELLS) / 2);
export const toppedTargetY = CELLS_VERTICAL_COUNT - TARGET_HEIGHT_CELLS;
