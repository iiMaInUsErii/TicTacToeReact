import "./App.css";
import { useState, useEffect } from "react";

const COLORS = [
  "#c66823", "#974f58", "#2c9a8e", "#01463f",
  "#47485d", "#52353e", "#c4193d", "#560307",
  "#321909", "#d99581", "#569353", "#4a6852",
  "#85111e", "#751b11", "#460523", "#70301b",
  "#442013", "#301a1b"
];

const INITIAL_FIELD = Array(3).fill().map(() => Array(3).fill(null));

function App() {
  const [field, setField] = useState(INITIAL_FIELD);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff");

  const applyRandomColor = () => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setCurrentColor(randomColor);
    document.body.style.background = randomColor;
    const button = document.querySelector("button.reset");
    if (button) button.style.color = randomColor;
  };

  useEffect(() => {
    document.title = "TicTacToe";
    applyRandomColor();
  }, []);

  useEffect(() => {
    if (winner || isDraw) {
      setShowModal(true);
    }
  }, [winner, isDraw]);

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  const checkWinner = (updatedField) => {
    // Проверка строк и столбцов
    for (let i = 0; i < 3; i++) {
      if (updatedField[i][0] && updatedField[i][0] === updatedField[i][1] && updatedField[i][0] === updatedField[i][2]) {
        return updatedField[i][0];
      }
      if (updatedField[0][i] && updatedField[0][i] === updatedField[1][i] && updatedField[0][i] === updatedField[2][i]) {
        return updatedField[0][i];
      }
    }
    // Проверка диагоналей
    if (updatedField[0][0] && updatedField[0][0] === updatedField[1][1] && updatedField[0][0] === updatedField[2][2]) {
      return updatedField[0][0];
    }
    if (updatedField[0][2] && updatedField[0][2] === updatedField[1][1] && updatedField[0][2] === updatedField[2][0]) {
      return updatedField[0][2];
    }
    return null;
  };

  const handleCellClick = (row, col) => {
    if (field[row][col] || winner || isDraw) return;

    const updatedField = field.map((r, rIdx) =>
      rIdx === row ? [...r.slice(0, col), currentPlayer, ...r.slice(col + 1)] : [...r]
    );

    setField(updatedField);

    const newWinner = checkWinner(updatedField);
    if (newWinner) {
      setWinner(newWinner);
      return;
    }

    if (updatedField.flat().every(cell => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setField(INITIAL_FIELD);
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
    setShowModal(false);
    applyRandomColor();
  };

  return (
    <div className="game-container">
      <div className='main'>
      <div className="status">
        {winner ? `Победитель: ${winner}` : isDraw ? "Ничья!" : `Текущий ход: ${currentPlayer}`}
      </div>

      {field.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ''} ${!cell && !winner && !isDraw ? 'cell-active' : ''}`}
              key={colIndex}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}

      <button className="reset" onClick={resetGame}>
        Новая игра
      </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div 
            className="modal" 
            style={{
              background: getContrastColor(currentColor),
              color: currentColor,
            }}
          >
            <h2>{winner ? `Победитель: ${winner}!` : "Ничья!"}</h2>
            <button 
              onClick={resetGame}
              style={{
                background: currentColor,
                color: getContrastColor(currentColor),
              }}
            >
              Играть снова
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;