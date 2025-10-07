export default function Scoreboard({ scores }){
  const { X=0, O=0, draws=0 } = scores || {};
  return (
    <div className="scoreboard">
      <div className="score"><span className="label">X</span><span className="value">{X}</span></div>
      <div className="score"><span className="label">O</span><span className="value">{O}</span></div>
      <div className="score"><span className="label">Draws</span><span className="value">{draws}</span></div>
    </div>
  );
}
