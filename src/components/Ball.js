import React from "react";
import styled from 'styled-components'
import {CELL_HEIGHT_PX, CELL_WEIGHT_PX, PLATFORM_WIDHT_CELLS_COUNT} from "../constants/game"

import {connect} from 'react-redux';
import {pushPlatformRight, pushPlatformLeft} from '../actions/platform'

const BallContainer = styled.div.attrs(({coordinate}) => ({
    style: {
        left: `${CELL_WEIGHT_PX * coordinate}px`
    }
}))`
        height: ${CELL_HEIGHT_PX}px;
        width: ${CELL_WEIGHT_PX}px;
        background-color: white;

        bottom: ${CELL_HEIGHT_PX}px;
        position: absolute;
        `;

class BallView extends React.Component {
    render() {
        const {platformCoordinate} = this.props;


        return (
            <BallContainer coordinate={platformCoordinate}>

            </BallContainer>
        )
    }
}

export const Ball = connect((state) => state, {pushPlatformRight, pushPlatformLeft})(BallView);
