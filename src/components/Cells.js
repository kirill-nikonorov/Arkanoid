import React from "react";
import styled from 'styled-components'
import {CELL_HEIGHT_PX, CELL_WEIGHT_PX} from "../constants/game";

const CellContainer = styled.div.attrs(
    ({x, y}) => ({
        style: {
            left: `${x * CELL_WEIGHT_PX}px`,
            top: y * CELL_HEIGHT_PX,
        }
    }))`
        height: ${CELL_HEIGHT_PX}px;
        width:${CELL_WEIGHT_PX}px;
        border: 1px solid blue;
        
        box-sizing: border-box ;
        position: absolute;
        `;

export const Cells = ({cells}) => {
    return (
        <div>
            {cells.map(({x, y}) => {
                return <CellContainer x={x} y={y} key={`${x} + ${y}`}/>
            })}
        </div>
    )
};
