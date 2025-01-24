import { useState, useEffect, useRef } from 'react';
import { MdOutlineTimer } from "react-icons/md";
import { CiTrophy } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.min.css';

const WordScramble = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120);
  const [gameOver, setGameOver] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const inputRefs = useRef([]);

  // Fetch words from the API
  const fetchWords = async () => {
    try {
      const response = await fetch(
        'https://q8nn4dzd1h.execute-api.ap-southeast-1.amazonaws.com/dev/hackathon-apis/get-words'
      );
      const data = await response.json();
      if (data.words && data.words.length > 0) {
        setWordList(data.words.slice(0, 15)); // Use the first 15 words
        loadNewWord(data.words[0]); // Load the first word
      } else {
        alert('Failed to fetch words. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  // Load a new word based on the index
  const loadNewWord = (wordObj) => {
    const word = wordObj.scrambled_word.toUpperCase();
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserInput(new Array(word.length).fill(''));

    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 0);
  };

  // Scramble word logic (optional, depends on API response)
  const scrambleWord = (word) => {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  // Handle input changes
  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    const newInput = [...userInput];
    newInput[index] = value.toUpperCase();
    setUserInput(newInput);

    if (value.length === 1 && index < currentWord.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      const newInput = [...userInput];
      if (userInput[index] === '') {
        if (index > 0) inputRefs.current[index - 1].focus();
      } else {
        newInput[index] = '';
        setUserInput(newInput);
      }
    } else if (event.key === 'Enter') {
      submitWord();
    }
  };

  // Submit word and load the next one
  const submitWord = () => {
    const enteredWord = userInput.join('');
    if (enteredWord === currentWord) {
      setScore((prev) => prev + 10); // Add 10 points for correct answer
    } else {
      setScore((prev) => Math.max(0, prev - 5)); // Deduct 5 points for wrong answer
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < wordList.length) {
      setCurrentIndex(nextIndex);
      loadNewWord(wordList[nextIndex]);
    } else {
      setGameOver(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    fetchWords();

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
      <h1 className="mb-5 text-white section-title">Word Scramble</h1>
      <div className="text-center p-3">
        <div className="mb-2 mt-5 d-flex justify-content-between align-items-center">
          <span className="badge text-content"><CiTrophy size={24} /> Score: {score}</span>
          <span className="badge text-content"><MdOutlineTimer size={24} /> {formatTime(timer)}</span>
        </div>

        <div className="d-flex flex-column justify-content-center text-white p-4 mb-4 word-box">
          <h2 className="scrambled-word section-title mb-4">{scrambledWord}</h2>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            {currentWord.split('').map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="form-control letter-input text-center text-white"
                ref={(el) => (inputRefs.current[index] = el)}
                value={userInput[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
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
