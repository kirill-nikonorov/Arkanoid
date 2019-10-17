import React from "react";
import styled from 'styled-components'
import {CELL_HEIGHT_PX, CELL_WEIGHT_PX, PLATFORM_WIDHT_CELLS_COUNT} from "../constants/game"

import {connect} from 'react-redux';
import {pushPlatformRight, pushPlatformLeft} from '../actions/platform'


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


const PlatformView = (props) => {
    console.log(props);
    const {dispatch, platformCoordinate} = props;


    return (
        <PlatformContainer coordinate={platformCoordinate}>
            <button onClick={() => {
                dispatch(pushPlatformLeft())
            }}>-
            </button>
            <button onClick={() => {
                dispatch(pushPlatformRight())
            }}>+
            </button>
        </PlatformContainer>
    )
};
export const Platform = connect((state) => state)(PlatformView);
