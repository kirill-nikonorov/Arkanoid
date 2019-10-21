import React from "react";
import styled from 'styled-components'
import {CellsGroup} from "./CellsGroup";
import {CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT} from "../constants/game";

import createRepeat from "@avinlab/repeat/dist/index.cjs";
import {connect} from "react-redux";
import {pushPlatformLeft, pushPlatformRight} from "../actions/platform";

import {startNewGame, toggleGameOn} from '../actions/gameStatus'

const TableContainer = styled.div`
        height: 100%;
        width: 100%;

        position: relative;
        `;


const createFilledArray = (rowCount, columnCount, color) => {
    const array = [];
    for (let y = 0; y < rowCount; y++) {
        for (let x = 0; x < columnCount; x++) {
            const data = {x, y};
            color && (data.color = color);
            array.push(data)
        }
    }
    return array;
};

const tableBackgroundData = createFilledArray(CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT);

const platformData = createFilledArray(1, 3, "green");
const ballData = createFilledArray(1, 1, "red");


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
         const {startNewGame,toggleGameOn} = this.props;
        // startNewGame();
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
            },
            {
                "keys": "space",
                "on_keydown": () => toggleGameOn(),
                "prevent_repeat": true
            }
        ]);
    }

    render() {
        const {platformCoordinate, ball: {x: ballX, y: ballY}} = this.props;

        return (
            <TableContainer>
                <CellsGroup cellsData={tableBackgroundData}/>
                <CellsGroup cellsData={platformData} figureX={platformCoordinate} figureY={0}/>
                <CellsGroup cellsData={ballData} figureX={ballX} figureY={ballY}/>

            </TableContainer>
        )
    }
}

export const Table = connect((state) => {
    return state
}, {pushPlatformRight, pushPlatformLeft, startNewGame, toggleGameOn})(TableView);

