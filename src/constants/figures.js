import {
    CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT, MISSILE_SIDE_IN_CELLS, PLATFORM_HEIGTH_CELLS_COUNT,
    PLATFORM_WIDTH_CELLS_COUNT,
    TARGET_HEIGHT_CELLS, TARGET_WIDTH_CELLS
} from "./game";

const createFilledArray = (rowCount, columnCount, color) => {
    const array = [];
    for (let y = 0; y < rowCount; y++) {
        const rowArray = []
        for (let x = 0; x < columnCount; x++) {
            const data = {x, y};
            color && (data.color = color);
            rowArray.push(data)
            array.push(data)
        }

    }
    return array;
};


export const tableBackgroundData = createFilledArray(CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT);

export const platformData = createFilledArray(PLATFORM_HEIGTH_CELLS_COUNT, PLATFORM_WIDTH_CELLS_COUNT, "green");

export const missileData = createFilledArray(MISSILE_SIDE_IN_CELLS, MISSILE_SIDE_IN_CELLS, "red");

export const targetData = createFilledArray(TARGET_HEIGHT_CELLS, TARGET_WIDTH_CELLS, "black");

export const centredTargetX = Math.round((CELLS_HORIZONTAL_COUNT - TARGET_WIDTH_CELLS) / 2);
export const toppedTargetY = CELLS_VERTICAL_COUNT - TARGET_HEIGHT_CELLS;
