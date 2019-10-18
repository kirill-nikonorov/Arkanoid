import {CELL_HEIGHT_PX, CELL_WEIGHT_PX} from "../constants/game";
import styled from "styled-components";

export const Cell = styled.div.attrs(
    ({x, y}) => ({
        style: {
            left: `${x * CELL_WEIGHT_PX}px`,
            top: `${y * CELL_HEIGHT_PX}px`,
        }
    }))`
        height: ${CELL_HEIGHT_PX}px;
        width:${CELL_WEIGHT_PX}px;
        border: 1px solid blue;
        
        box-sizing: border-box ;
        position: absolute;
      `;


export const PlatformCell = styled(Cell)`
        background-color: green;
        `;
export const BallCell = styled(Cell)`
        background-color: white;
        `;