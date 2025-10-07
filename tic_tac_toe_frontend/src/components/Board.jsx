import Square from './Square';

export default function Board({ squares, onSquareClick, winningLine }){
  return (
    <div className="board">
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onSquareClick(idx)}
          isWinning={winningLine?.includes(idx)}
        />
      ))}
    </div>
  );
}
