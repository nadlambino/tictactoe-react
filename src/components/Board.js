import React, { useState, useEffect } from 'react';
import Announce from './Announce';
import Tile from './Tile';
import Player from './Player';
import ServerMessage from './ServerMessage';

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

const emptyBoard = Array(9).fill(null)
let role = null

export default function Board({socket, username, room, message}) {
  const [currentPlayer, setCurrentPlayer] = useState(players.x)
  const [board, setBoard] = useState(emptyBoard)
  const [won, setWon] = useState(false)
  const [draw, setDraw] = useState(false)
  const [inGame, setInGame] = useState(true)
  const [winner, setWinner] = useState(null)
  const [serverMessage, setServerMessage] = useState([message])

  socket.on('player_disconnected', (user) => {
    resetGame()
    setServerMessage([`Player ${user} has disconnected. The game was resetted.`])
  })

  useEffect(() => {
    checkWinningCombination()
    if (won === true) {
      return setInGame(false);
    }

    checkForDraw()
    if (role !== null) {
      changePlayer()
    }
  }, [board])

  useEffect(() => {
    socket.on('change_player', (player) => {
      setCurrentPlayer(player)
    })
    socket.on('move', (data) => {
      setBoard(data.board)
      setWon(data.won)
      setInGame(data.inGame)
    })
    socket.on('draw', (data) => {
      setDraw(data)
    })
    socket.on('reset', resetGame)
  }, [])

	const handleTileClick = (index) => {
    role = role === null ? currentPlayer : role
    if (role !== currentPlayer || won === true || draw === true) {
      return
    }

    let isValidAction = validateAction(index);
		if (isValidAction === false || inGame === false) {
			return false;
		}

		markTile(index);
	};

	const markTile = async (index) => {
		let newBoard = [...board];
		newBoard[index] = currentPlayer;
    setBoard(newBoard);
    socket.emit('move', {board: newBoard, won, inGame})
	};

	const changePlayer = () => {
		let nextPlayer = currentPlayer === players.x ? players.o : players.x;
		setCurrentPlayer(nextPlayer);
    socket.emit('change_player', nextPlayer)
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
				setWon(true);
        setWinner(currentPlayer)
				break;
			}
		}
	};

	const checkForDraw = () => {
    if (won === true) {
      return
    }
		if (board.every((element) => element !== null) && won === false) {
      setDraw(true)
      socket.emit('draw', true)
    }
	};

  const handleResetClick = () => {
    resetGame()
    socket.emit('reset')
  }

	const resetGame = () => {
    setCurrentPlayer(players.x);
    setBoard(emptyBoard);
    setWon(false)
    setDraw(false)
    setInGame(true)
    setWinner(null)
    role = null

    socket.emit('move', {board: emptyBoard, won: false, inGame: true})
    socket.emit('change_player', players.x)
    socket.emit('draw', false)
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
      <ServerMessage messages={serverMessage} />
      <Announce
        player={winner}
        won={won}
        draw={draw}
      />
      <Player player={role} />
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
        <button onClick={handleResetClick}>Play Again</button>
      </div>
    </>
  );
}