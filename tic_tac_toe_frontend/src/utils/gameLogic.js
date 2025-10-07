export const LINES = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ];
export function calculateWinner(squares){ 
  for(const [a,b,c] of LINES){ 
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) 
      return {winner:squares[a], line:[a,b,c]}; 
  } 
  return null; 
}

export function isDraw(squares){ 
  return !calculateWinner(squares) && squares.every(Boolean); 
}

function findWinningMove(squares, player){
  for(const [a,b,c] of LINES){
    const line=[squares[a],squares[b],squares[c]];
    const count=line.filter(v=>v===player).length;
    const emptyIdx=[a,b,c].find(i=>!squares[i]);
    if(count===2 && emptyIdx!==undefined) return emptyIdx;
  }
  return null;
}

export function bestCpuMove(squares, cpu='O', human='X'){
  // 1) win
  let m=findWinningMove(squares,cpu);
  if(m!==null) return m;
  // 2) block
  m=findWinningMove(squares,human);
  if(m!==null) return m;
  // 3) take center
  if(!squares[4]) return 4;
  // 4) take a corner
  const corners=[0,2,6,8].filter(i=>!squares[i]);
  if(corners.length) return corners[Math.floor(Math.random()*corners.length)];
  // 5) any side
  const sides=[1,3,5,7].filter(i=>!squares[i]);
  if(sides.length) return sides[Math.floor(Math.random()*sides.length)];
  return null;
}
