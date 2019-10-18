import React from "react";
import styled from 'styled-components'
import {createFigure} from "./CellsGroup";
import {CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT} from "../constants/game";

import createRepeat from "@avinlab/repeat/dist/index.cjs";
import {connect} from "react-redux";
import {pushPlatformLeft, pushPlatformRight} from "../actions/platform";

import {Cell, PlatformCell, BallCell} from "./styles";

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
const TableBackGround = createFigure(Cell, tableBackgroundCells);

const platformMap = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]
const Platform = createFigure(PlatformCell, platformMap);


const Ball = createFigure(BallCell, [{x: 0, y: 0}]);

class TableView extends React.Component {
    handleDirectionKeyPressDown = (direction) => {
        const {pushPlatformRight, pushPlatformLeft} = this.props;

        this.stopRepeater();

        this.repeater = createRepeat({
            action: () => {
                if (direction === "right") pushPlatformRight();
                if (direction === "left") pushPlatformLeft();
            },
            delay: 50
        });

        this.repeater.start();
    };

    stopRepeater = () => {
        if (this.repeater) {
            this.repeater.stop();
            this.repeater = null;
        }
    };

    componentDidMount() {
        const listener = new window.keypress.Listener();

        listener.register_many([
            {
                "keys": "d",
                "on_keydown": () => this.handleDirectionKeyPressDown("right"),
                "on_keyup": this.stopRepeater,
                "prevent_repeat": true
            },
            {
                "keys": "a",
                "on_keydown": () => this.handleDirectionKeyPressDown("left"),
                "on_keyup": this.stopRepeater,
                "prevent_repeat": true
            }
        ]);
    }

    render() {
        const {platformCoordinate} = this.props;
        return (
            <TableContainer>
                <TableBackGround/>
                <Platform figureX={platformCoordinate} figureY={CELLS_VERTICAL_COUNT - 1}/>
                <Ball figureX={platformCoordinate} figureY={platformCoordinate}/>

            </TableContainer>
        )
    }

}

export const Table = connect((state) => state, {pushPlatformRight, pushPlatformLeft})(TableView);

