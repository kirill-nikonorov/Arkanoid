import React from "react";
import styled from 'styled-components'
import {Figure} from "./Figure";
import {CELLS_HORIZONTAL_COUNT, CELLS_VERTICAL_COUNT} from "../constants/game";

import createRepeat from "@avinlab/repeat/dist/index.cjs";
import {connect} from "react-redux";
import {pushPlatformLeft, pushPlatformRight} from "../actions/platform";

import {startNewGame, toggleGameOn} from '../actions/gameStatus'
import {moveMissile} from "../lib/redux-actions/missile";
import {
    centredTargetX, missileData, platformData, tableBackgroundData, targetData,
    toppedTargetY
} from "../constants/figures";

const TableContainer = styled.div`
        height: 100%;
        width: 100%;

        position: relative;
        `;




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
        const {startNewGame, toggleGameOn, moveBall} = this.props;
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
            },
            {
                "keys": "r",
                "on_keydown": () => startNewGame(),
                "prevent_repeat": true
            },
            {
                "keys": "e",
                "on_keydown": () => moveBall({x: 8.55, y: 5.97, angle: 45}),
                "prevent_repeat": true
            },
            {
                "keys": "w",
                "on_keydown": () => moveBall({x: 0.03000000000000025, y: 4.55, angle: 135}),
                "prevent_repeat": true
            },
            {
                "keys": "q",
                "on_keydown": () => moveBall({x: 8.970000000000002, y: 4.97, angle: 45}),
                "prevent_repeat": true
            }
        ]);
    }

    render() {
        const {platformCoordinate, missile: {x: missileX, y: missileY}} = this.props;

        return (
            <TableContainer>
                <Figure figureData={tableBackgroundData}/>
                <Figure figureData={targetData} figureX={centredTargetX} figureY={toppedTargetY}/>

                <Figure figureData={platformData} figureX={platformCoordinate} figureY={0}/>
                <Figure figureData={missileData} figureX={missileX} figureY={missileY}/>
            </TableContainer>
        )
    }
}

export const Table = connect((state) => {
    return state
}, {pushPlatformRight, pushPlatformLeft, startNewGame, toggleGameOn, moveBall: moveMissile})(TableView);

