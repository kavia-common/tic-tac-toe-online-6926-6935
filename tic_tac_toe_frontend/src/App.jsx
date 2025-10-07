import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Board from './components/Board';
import GameControls from './components/GameControls';
import Scoreboard from './components/Scoreboard';
import { calculateWinner, isDraw, bestCpuMove } from './utils/gameLogic';

export default function App(){
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('pvp'); // 'pvp' | 'cpu'
  const [scores, setScores] = useState({ X:0, O:0, draws:0 });
  const [winningLine, setWinningLine] = useState(null);

  const currentPlayer = xIsNext ? 'X' : 'O';

  const status = useMemo(()=>{
    const win = calculateWinner(squares);
    if(win){ return `Winner: ${win.winner}`; }
    if(isDraw(squares)) return 'Draw!';
    return `Next player: ${currentPlayer}`;
  }, [squares, currentPlayer]);

  function handleClick(i){
    if(calculateWinner(squares) || squares[i]) return;
    const next = squares.slice();
    next[i] = currentPlayer;
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function newGame(){
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine(null);
  }

  useEffect(()=>{
    const win = calculateWinner(squares);
    if(win){
      setWinningLine(win.line);
      setScores(s=>({...s, [win.winner]: (s[win.winner]||0)+1 }));
      return;
    }
    if(isDraw(squares)){
      setScores(s=>({...s, draws: s.draws+1 }));
      return;
    }
    // CPU turn
    if(mode==='cpu' && !xIsNext){
      const move = bestCpuMove(squares, 'O','X');
      if(move!==null){
        const t = setTimeout(()=>{
          setSquares(prev => {
            if(prev[move]) return prev; // safety
            const next = prev.slice();
            next[move] = 'O';
            return next;
          });
          setXIsNext(true);
        }, 300);
        return () => clearTimeout(t);
      }
    }
  }, [squares, xIsNext, mode]);

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Tic Tac Toe</h1>
        <Scoreboard scores={scores} />
        <Board squares={squares} onSquareClick={handleClick} winningLine={winningLine} />
        <GameControls mode={mode} setMode={(m)=>{ setMode(m); newGame(); }} onNewGame={newGame} status={status} />
        <footer className="footer">Ocean Professional • React</footer>
      </div>
    </div>
  );
}
