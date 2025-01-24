import React from "react";
import { useNavigate } from "react-router-dom";
import "./games.css";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();

  const handleWordScrambleClick = () => {
    navigate("/games/word-scramble");
  };

  return (
    <div className="game-list-root">
      <h1 className="heading">Hi John Doe</h1>
      <p className="subheading">Select the game that you want to play</p>
      <div className="button-container">
        <button 
          className="game-text-box" 
          onClick={handleWordScrambleClick}
        >
          Word scramble
        </button>
      </div>
    </div>
  );
};

export default Games;

