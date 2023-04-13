import React, { useState, useEffect } from 'react';
import Announce from './Announce';
import Tile from './Tile';

export default function Board({socket, room}) {
	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	const players = {
		x: '1',
		o: '-1',
	};
	const [state, setState] = useState({
		player: players.x,
		board: Array(9).fill(null),
		won: false,
		draw: false,
		inGame: true,
	});

  const [board, setBoard] = useState(Array(9).fill(null))

  useEffect(() => {
    checkWinningCombination()
    if (state.won === true) {
      setState((prevState) => ({...prevState, inGame: false}));
    }
    changePlayer();
  }, [board, state.won, state.inGame, state.draw])

  useEffect(() => {
    checkForDraw()
    socket.on('move', ({board, state}) => {
      setBoard(board)
    })
  }, [state.player])

	const handleTileClick = (index) => {
		let isValidAction = validateAction(index);
		if (isValidAction === false || state.inGame === false) {
			return false;
		}

		markTile(index);
	};

	const markTile = async (index) => {
		let newBoard = [...board];
		newBoard[index] = state.player;
    setBoard(newBoard);
    socket.emit('move', {...state, room, board: newBoard})
	};

	const changePlayer = () => {
		let nextPlayer =
			state.player === players.x
				? players.o
				: players.x;
		setState((prevState) => ({...prevState, player: nextPlayer }));
	};

	const validateAction = (index) => {
		if (board[index] !== null) {
			return false;
		}
		return true;
	};

	const checkWinningCombination = () => {
		for (let i = 0; i <= 7; i++) {
			const winCondition = winningConditions[i];

			if (
				board[winCondition[0]] === null ||
				board[winCondition[1]] === null ||
				board[winCondition[2]] === null
			) {
				continue;
			}

			if (
				board[winCondition[0]] ===
					board[winCondition[1]] &&
				board[winCondition[1]] ===
					board[winCondition[2]]
			) {
				setState((prevState) => ({...prevState, won: true }));
				break;
			}
		}
	};

	const checkForDraw = () => {
    if (state.won === true) {
      return
    }
		if (board.every((element) => element !== null)) {
			setState(prevState => ({...prevState, draw: true }));
		}
	};

	const resetGame = () => {
		setState(prevState => ({
			player: players.x,
			won: false,
			inGame: true,
			draw: false,
		}));

    setBoard(Array(9).fill(null))
	};

	const getClassName = (value) => {
		switch (value) {
			case players.x:
				return 'x-tile';
			case players.o:
				return 'o-tile';
			default:
				return '';
		}
	};

	const getBorderClassName = (index) => {
		switch (index) {
			case 0:
				return ' no-border-top no-border-left ';
			case 1:
				return ' no-border-top ';
			case 2:
				return ' no-border-top no-border-right ';
			case 3:
				return ' no-border-left ';
			case 4:
				return '';
      case 5:
        return ' no-border-right ';
      case 6:
        return ' no-border-bottom no-border-left ';
      case 7:
        return ' no-border-bottom ';
      case 8:
        return ' no-border-bottom no-border-right ';
      default:
        return '';
    }
  }

  return (
    <>
      <Announce
        player={state.player}
        won={state.won}
        draw={state.draw}
      />
      <div className='board'>
        {
          board && board.map((_, i) => {
            return (
              <Tile
                borderClassName={getBorderClassName(i)}
                tileClassName={getClassName(board[i])}
                key={i}
                index={i}
                handleTileClick={handleTileClick}
                value={board[i]}
              />
            )
          })
        }
      </div>
      <div className='controls'>
        <button onClick={resetGame}>Play Again</button>
      </div>
    </>
  );
}