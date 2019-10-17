import React from "react";
import styled from 'styled-components'
import {Cells} from "./Cells";
import {CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT} from "../constants/game";

const TableContainer = styled.div`
        height: 100%;
        width:100%;

        position: relative;
        `;


const tableBackgroundCells = [];

for (let x = 0; x < CELLS_HORIZONTAL_COUNT; x++) {
    for (let y = 0; y < CELLS_VERTICAL_COUNT; y++) {
        tableBackgroundCells.push({x, y})
    }
}


console.log(tableBackgroundCells);

export const Table = () => {

    return (
        <TableContainer>
            <Cells cells={tableBackgroundCells} oy/>
        </TableContainer>
    )
};
