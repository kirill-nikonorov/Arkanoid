import React from "react";
import styled from 'styled-components'
import {Table} from "./Table";
import {STEP_TIME_MILLISECONDS, TABLE_HEIGHT_PX, TABLE_WIDTH_PX} from "../constants/game";
import {connect} from "react-redux";
import {toggleGameOn} from "../actions/gameStatus";
import {pushBall} from "../actions/ball";
import {checkIsGameOn} from "../utils/gameStatusCheckers";

const GameContainer = styled.div`
        height: ${TABLE_HEIGHT_PX}px;
        width:${TABLE_WIDTH_PX}px;
        outline: 5px solid #666;
        position: relative;
        `;

const PauseButton = styled.button`
        position: absolute;
        top: -30px;
        `;


class GameView extends React.Component {
    setUpGameTimer = () => {
        const {pushBall} = this.props;

        this.stepTimer = setInterval(() => {
            pushBall()
        }, STEP_TIME_MILLISECONDS);
    };
    cleanGameTimer = () => {
        const {stepTimer} = this;
        if (stepTimer) clearInterval(stepTimer);
    };

    UNSAFE_componentWillReceiveProps({gameIsOn: NewGameIsOn}) {
        const {gameIsOn} = this.props;

        if (!gameIsOn && NewGameIsOn) this.setUpGameTimer();
        if (gameIsOn && !NewGameIsOn) this.cleanGameTimer();
    }

    render() {
        const {toggleGameOn} = this.props;
        console.log(this.props);

        return (
            <GameContainer>
                <PauseButton onClick={toggleGameOn}>Пауза</PauseButton>
                <Table/>
            </GameContainer>
        )
    }
}

const mapStateToProps = ({gameStatus}) => {
    return {gameIsOn: checkIsGameOn(gameStatus)}

};
export const Game = connect(mapStateToProps, {pushBall, toggleGameOn})(GameView);

