import React, { Fragment } from "react";
import Announce from "./Announce";
import Tile from "./Tile";

export default class Board extends React.Component {
    constructor() {
        super();
        this.winningConditions =[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.players = {
            x: '1',
            o: '-1'
        }
        this.state = {
            'player' : this.players.x,
            'board' : Array(9).fill(null),
            'won' : false,
            'draw' : false,
            'inGame': true
        };
        this.handleTileClick = this.handleTileClick.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    async handleTileClick(index) {
        let isValidAction = this.validateAction(index);
        if (isValidAction === false || this.state.inGame === false) {
            return false;
        }
        
        await this.markTile(index);
        await this.checkWinningCombination();
        if (this.state.won === true) {
            this.setState({'inGame': false});
            return;
        }
        this.changePlayer();
    }

    markTile(index) {
        let board = [...this.state.board];
        board[index] = this.state.player;
        this.setState({
            'board' : board
        });
    }

    changePlayer() {
        let nextPlayer = this.state.player === this.players.x ? this.players.o : this.players.x;
        this.setState({
            'player' : nextPlayer
        });
    }

    validateAction(index) {
        if (this.state.board[index] !== null) {
            return false;
        }
        return true;
    }

    checkWinningCombination() {
        if (this.state.board.every(element => element !== null)) {
            this.setState({'draw' : true});
            return;
        }
        for (let i = 0; i <= 7; i++) {
            const winCondition = this.winningConditions[i];

            if (this.state.board[winCondition[0]] === null || 
                this.state.board[winCondition[1]] === null || 
                this.state.board[winCondition[2]] === null) {
                continue;
            }

            if (this.state.board[winCondition[0]] === this.state.board[winCondition[1]] && 
                this.state.board[winCondition[1]] === this.state.board[winCondition[2]]) {
                this.setState({'won' : true});
                break;
            }
        }
    }

    resetGame() {
        this.setState({
            'player' : this.players.x,
            'board' : Array(9).fill(null),
            'won' : false,
            'inGame': true,
            'draw' : false
        });
    }

    getClassName(value) {
        switch (value) {
            case this.players.x :
                return 'x-tile';
            case this.players.o :
                return 'o-tile';
            default :
                return '';
        }
    }

    getBorderClassName(index) {
        switch (index) {
            case 0 : 
                return ' no-border-top no-border-left ';
            case 1 : 
                return ' no-border-top ';
            case 2 : 
                return ' no-border-top no-border-right ';
            case 3 : 
                return ' no-border-left ';
            case 4 : 
                return '';
            case 5 : 
                return ' no-border-right ';
            case 6 : 
                return ' no-border-bottom no-border-left ';
            case 7 : 
                return ' no-border-bottom ';
            case 8 : 
                return ' no-border-bottom no-border-right ';
            default :
                return '';
        }
    }

    render() {
        const tiles = this.state.board.map((_, i) => {
            return <Tile
                className={this.getClassName(this.state.board[i]) + this.getBorderClassName(i)}
                key={i}
                index={i}
                handleTileClick={this.handleTileClick}
                value={this.state.board[i]}
            />
        });


        return (
            <Fragment>
                <Announce player={this.state.player} won={this.state.won} draw={this.state.draw} />
                <div className="board">
                    {tiles}
                </div>
                <div className="controls">
                    <button onClick={this.resetGame}>Play Again</button>
                </div>
            </Fragment>
        );
    }
}
