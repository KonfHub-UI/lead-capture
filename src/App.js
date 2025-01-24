import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./pages/singIn";
import Games from "./pages/games/games";
import WordScramble from "./pages/games/word-scrumble";
import SuccessPage from './pages/success/SuccessPage';


function App() {
  return (
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/word-scramble" element={<WordScramble />} />
                <Route path="/success" element={<SuccessPage />} />
            </Routes>
  );
}

export default App;
