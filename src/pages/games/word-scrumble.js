import { useState, useEffect, useRef } from 'react';
import { MdOutlineTimer } from "react-icons/md";
import { CiTrophy } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.min.css';

const words = ['REACT', 'JAVASCRIPT', 'BOOT', 'DEVELOPER', 'PROGR'];

const WordScramble = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120);
  const [gameOver, setGameOver] = useState(false);

  // Create refs to track input fields
  const inputRefs = useRef([]);

  const scrambleWord = (word) => {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  const getNewWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserInput(new Array(word.length).fill(''));

    // Reset focus to the first input
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 0);
  };

  useEffect(() => {
    getNewWord();

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent entering more than one character
    const newInput = [...userInput];
    newInput[index] = value.toUpperCase(); // Ensure uppercase
    setUserInput(newInput);

    // Move focus to the next input box if a character is entered
    if (value.length === 1 && index < currentWord.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      const newInput = [...userInput];
      if (userInput[index] === '') {
        // Move focus to the previous input box if it's empty
        if (index > 0) inputRefs.current[index - 1].focus();
      } else {
        // Clear the current input
        newInput[index] = '';
        setUserInput(newInput);
      }
    } else if (event.key === 'Enter') {
      // Explicitly check the word and move to the next word
      submitWord();
    }
  };

  const submitWord = () => {
    if (userInput.join('') === currentWord) {
      setScore((prev) => prev + 20); // Increment score
      getNewWord(); // Load a new word
    } else {
      alert('Incorrect word! Try again.');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (gameOver) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark">
        <div className="text-center bg-dark text-white p-5 rounded">
          <h1>Game Over!</h1>
          <div className="mb-4">
            <span className="display-1">👑</span>
            <h2 className="mt-3">Your Score</h2>
            <p className="display-4 text-info">{score}</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="mb-5 text-white">Word Scramble</h1>
      <div className="text-center">
        <div className="mb-2 mt-5 d-flex justify-content-between align-items-center">
          <span className="badge text-content"><CiTrophy size={24} /> Score: {score}</span>
          <span className="badge text-content"><MdOutlineTimer size={24} /> {formatTime(timer)}</span>
        </div>

        <div className="d-flex flex-column justify-content-center text-white p-4 mb-4 word-box">
          <h2 className="scrambled-word mb-4">{scrambledWord}</h2>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            {currentWord.split('').map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="form-control letter-input text-center text-gray-900"
                ref={(el) => (inputRefs.current[index] = el)} // Assign input refs
                value={userInput[index] || ''} // Default to empty string
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)} // Handle backspace and Enter
              />
            ))}
          </div>
        </div>

        <button className="mt-5 next-button" onClick={submitWord}>
          Next
        </button>
      </div>
    </div>
  );
};

export default WordScramble;
