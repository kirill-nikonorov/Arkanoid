import React from "react";
import styled from 'styled-components'
import {CELL_HEIGHT_PX, CELL_WEIGHT_PX} from "../constants/game";

const CellsGroupContainer = styled.div.attrs(
    ({figureX, figureY}) => ({
        style: {
            left: `${figureX * CELL_WEIGHT_PX}px`,
            top: `${figureY * CELL_HEIGHT_PX}px`,
        }
    }))`
     
        outline: 2px solid #aaa;

        position: absolute;
        `;

export const createFigure = (Cell, cellMap) =>
    class CellsGroup extends React.Component {
            render() {
            const { figureX = 0, figureY = 0} = this.props;
            return (
                <CellsGroupContainer figureX={figureX} figureY={figureY}>
                    {cellMap.map(({x, y}) => {
                        return <Cell x={x} y={y} key={`${x} + ${y}`} />
                    })}
                </CellsGroupContainer>
            )
        }
    };

