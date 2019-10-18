import React from "react";
import styled from 'styled-components'
import {CELL_HEIGHT_PX, CELL_WEIGHT_PX, PLATFORM_WIDHT_CELLS_COUNT} from "../constants/game"

import {connect} from 'react-redux';
import {pushPlatformRight, pushPlatformLeft} from '../actions/platform'
import createRepeat from '@avinlab/repeat';

const PlatformContainer = styled.div.attrs(({coordinate}) => ({
    style: {
        left: `${CELL_WEIGHT_PX * coordinate}px`
    }
}))`
        height: ${CELL_HEIGHT_PX}px;
        width: ${CELL_WEIGHT_PX * PLATFORM_WIDHT_CELLS_COUNT}px;
        background-color: green;

        bottom:0;
        position: absolute;
        `;

class PlatformView extends React.Component {

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
            <PlatformContainer coordinate={platformCoordinate}>

            </PlatformContainer>
        )
    }
}

export const Platform = connect((state) => state, {pushPlatformRight, pushPlatformLeft})(PlatformView);
