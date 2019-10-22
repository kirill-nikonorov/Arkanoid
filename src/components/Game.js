import React from "react";
import styled from 'styled-components'
import {Table} from "./Table";
import {STEP_TIME_MILLISECONDS, TABLE_HEIGHT_PX, TABLE_WIDTH_PX} from "../constants/game";
import {connect} from "react-redux";
import {toggleGameOn} from "../actions/gameStatus";
import {pushMissile} from "../actions/missile";
import {checkIsGameOn} from "../utils/gameStatusCheckers";
import {moveMissile} from "../lib/redux-actions/missile";

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

const KikButton = styled.button`
        position: absolute;
        top: -30px;
        left: 70px;
        `;
const AnglePanel = styled.div`
        height: 25px;
        width: 25px;
        border: 1px solid black;
        position: absolute;
        bottom: -40px;
        `;


class GameView extends React.Component {
    setUpGameTimer = () => {
        const {pushMissile} = this.props;

        this.stepTimer = setInterval(() => {
            pushMissile()
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
        const {toggleGameOn, movMissile, angle} = this.props;

        return (
            <GameContainer>
                <PauseButton onClick={toggleGameOn}>Пауза</PauseButton>
                <KikButton onClick={() => movMissile({x: 8.55, y: 4.55})}>Кинуть шар</KikButton>
                <Table/>
                <AnglePanel>{angle}</AnglePanel>

            </GameContainer>
        )
    }
}

const mapStateToProps = ({gameStatus, missile: {angle}}) => {
    return {gameIsOn: checkIsGameOn(gameStatus), angle}

};
export const Game = connect(mapStateToProps, { moveMissile,  pushMissile, toggleGameOn})(GameView);

