import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [field, setField] = useState([
    [{},{},{}],
    [{},{},{}],
    [{},{},{}]
  ])
  const [player, setPlayer] = useState('X')

  const reset = () => {
    setField(
      [
        [{},{},{}],
        [{},{},{}],
        [{},{},{}]
      ]
    )
    setPlayer('X')
    let colors = [ "#c66823", "#974f58", "#2c9a8e", "#01463f",
      "#47485d", "#52353e", "#c4193d", "#560307",
      "#321909", "#d99581", "#569353", "#4a6852",
      "#85111e", "#751b11", "#460523", "#70301b",
      "#442013", "#301a1b"
    ];

    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    
    document.body.style.background = randomColor
    document.getElementsByTagName('button')[0].style.color = randomColor
  }

  return (
    
    <>
      {field.map((partOfField, i) => {
        return (
          <div className='row' style={{
            display: 'flex'
          }} key={i}>{partOfField.map((cell, i) => {
            return <div className='App cell' style={{
              width: '100px',
              height: "100px",
              fontSize: "65px",
              color: 'white',
              fontFamily: 'Quicksand, sans-serif'
            }} key={i} onClick={() => {
              if (!cell.status){
                cell.status = player;
                setPlayer(player == "X" ? "O" : "X")
                for(let i = 0; i < 3; i++) {
                  if((field[i][0].status + field[i][1].status + field[i][2].status) == ('XXX') || (field[i][0].status + field[i][1].status + field[i][2].status) == ('OOO')){
                    alert(" Победитель1 : " + player);
                    reset()
                  } else if((field[0][i].status + field[1][i].status + field[2][i].status) == ('XXX') || (field[0][i].status + field[1][i].status + field[2][i].status) == ('OOO')){
                    alert(" Победитель2 : " + player);
                    reset()
                  } else if((field[0][0].status + field[1][1].status + field[2][2].status) == ('XXX') || (field[0][0].status + field[1][1].status + field[2][2].status) == ('OOO')){
                    alert(" Победитель3 : " + player);
                    reset()
                  } else if((field[0][2].status + field[1][1].status + field[2][0].status) == ('XXX') || (field[0][2].status + field[1][1].status + field[2][0].status) == ('OOO')){
                    alert(" Победитель4 : " + player);
                    reset()
                  }
                }
              }
            }}>{cell.status}</div>
          })}</div>
        )
      })}
      <button style={{
        width: '150px',
        height: '40px',
        marginTop: '20px',
        border: '0',
        borderRadius: '20px',
        fontFamily: 'Quicksand, sans-serif'
      }} onClick={() => {
        reset()
      }}>Reset</button>
    </>
  )
}

export default App;