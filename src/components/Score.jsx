const Score = ({players}) => {
  return (
    <div>
        
      <div>{players[0].name}: {players[0].score}</div>
      <div>{players[1].name}: {players[1].score}</div>
    </div>
  );
};

export default Score;