import "./success.css";

const SuccessPage = () => {
  return (
    <div className="success-page-root">
      <h1 className="heading-success">You Win!</h1>
      <div className="button-container">
        <button className="game-text-box">Your Score</button>
        <button className="game-text-box">1200</button>
      </div>
    </div>
  );
};

export default SuccessPage;
