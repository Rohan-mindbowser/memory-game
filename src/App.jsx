import { useRef, useState } from "react";
import "./App.css";

function App() {
  const boxRef = useRef();
  const [count, setCount] = useState(0);
  const [boxNumber, setBoxNumber] = useState(null);
  const [boxes, setBoxes] = useState([0, 1, 2, 3, 4]);
  const [timeInterval, setTimeInterval] = useState(null);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [delay, setDelay] = useState(900);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const startGame = () => {
    if (intervalId) return;
    const id = setInterval(() => {
      boxRef.current.classList.remove("red");
      setTime((prevTime) => prevTime + 1);
      setBoxNumber(getRandomInt(0, 4));
    }, delay);

    setIntervalId(id);
  };

  const endGame = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setBoxNumber(null);
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
  };

  const boxClick = (index, e) => {
    if (index == boxNumber) {
      setScore((prev) => prev + 1);
    } else {
      if (score > highScore) {
        setHighScore(score);
      }
      if (score > 0) {
        setScore((prev) => prev - 1);
      }
      e.target.classList.add("red");
      setTimeout(() => {
        e.target.classList.remove("red");
      }, 400);
    }
  };

  return (
    <>
      <div className="container">
        <div className="inner-container">
          {/* {highScore > 0 && <div>wohoo New high score : {highScore} 🚀</div>} */}
          <div className="score-container ">
            <div className="score">Score : {score}</div>
            <div className="high-score">High score : {highScore}</div>
          </div>
          <div className="boxes">
            {boxes?.map((box, index) => {
              return (
                <div
                  ref={boxRef}
                  key={index}
                  id={index}
                  className={`box ${index === boxNumber ? "green" : ""}`}
                  onClick={(e) => {
                    boxClick(index, e);
                  }}
                ></div>
              );
            })}
          </div>
          <div className="btn-container">
            <button className="button-end" onClick={endGame}>
              End
            </button>
            <button className="button" onClick={startGame}>
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
