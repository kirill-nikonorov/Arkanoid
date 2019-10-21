import React from "react";
import styled from 'styled-components'
import {CELL_HEIGHT_PX, CELL_WEIGHT_PX} from "../constants/game";
import {pure} from 'recompose';

const CellsGroupContainer = styled.div.attrs(
    ({figureX, figureY}) => ({
        style: {
            left: `${figureX * CELL_WEIGHT_PX}px`,
            bottom: `${figureY * CELL_HEIGHT_PX}px`,
        }
    }))`
        outline: 2px solid #aaa;
        position: absolute;
        `;

export const Cell = styled.div.attrs(
    ({x, y}) => ({
        style: {
            left: `${x * CELL_WEIGHT_PX}px`,
            bottom: `${y * CELL_HEIGHT_PX}px`,
        }
    }))`
        height: ${CELL_HEIGHT_PX}px;
        width:${CELL_WEIGHT_PX}px;
        border: 1px solid blue;
        background-color:${({color}) => `${color}` || `#aaa`};
        box-sizing: border-box ;
        position: absolute;
      `;


export const CellsGroupView = ({cellsData, figureX = 0, figureY = 0}) => {
    return (
        <CellsGroupContainer figureX={figureX} figureY={figureY}>
            {cellsData.map(({x, y, color}) => {
                return <Cell x={x} y={y} color={color} key={`${x} + ${y}`}>{`${y} + ${x}`}</Cell>
            })}
        </CellsGroupContainer>
    )
};

export const CellsGroup = pure(CellsGroupView);