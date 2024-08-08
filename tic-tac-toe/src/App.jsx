import './App.css'
import {useState} from 'react'
import { Square } from './components/Square'
import { TURNS } from './components/constants'
import { checkWinner } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const checkEndGame = (newBoard) => {
    //revisamos si hay un empate
    //si no hay mas espacios vasios en el tablero
    return newBoard.every((square) => square === null)
  }


  const updateBoard = (index) => {
    //no actualizamos esta posicion
    //si ya tiene algo
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar estado del tablero para guardar la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
  <main className="board">
    <h1>Tic tac toe</h1>
    <button onClick={resetGame}>Reset del juego</button>
    <section className="game">
      {
        board.map((_, index) => {
          return (
            <Square
              key={index}
              index = {index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
    </section>
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
     <WinnerModal resetGame={resetGame} winner={winner} /> 
  </main>
  )
}

export default App