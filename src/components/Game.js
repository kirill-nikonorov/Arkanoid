import React from "react";
import styled from 'styled-components'
import {Table} from "./Table";
import {TABLE_HEIGHT_PX, TABLE_WIDTH_PX} from "../constants/game";

const GameContainer = styled.div`
        height: ${TABLE_HEIGHT_PX}px;
        width:${TABLE_WIDTH_PX}px;
        border: 1px solid red;
        `;

export const Game = () => {
    return (
        <GameContainer>
            <Table/>

        </GameContainer>
    )
};
