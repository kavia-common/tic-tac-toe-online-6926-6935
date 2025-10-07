export default function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? 'square-win' : ''}`}
      onClick={onClick}
      aria-label={`Square ${value ? value : 'empty'}`}
    >
      {value}
    </button>
  );
}
