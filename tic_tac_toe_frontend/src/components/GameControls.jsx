export default function GameControls({ mode, setMode, onNewGame, status }){
  return (
    <div className="controls">
      <div className="modes">
        <button className={`btn ${mode==='pvp' ? 'btn-primary' : ''}`} onClick={()=>setMode('pvp')}>Player vs Player</button>
        <button className={`btn ${mode==='cpu' ? 'btn-primary' : ''}`} onClick={()=>setMode('cpu')}>Player vs CPU</button>
      </div>
      <div className="status">{status}</div>
      <button className="btn btn-secondary" onClick={onNewGame}>New Game</button>
    </div>
  );
}
