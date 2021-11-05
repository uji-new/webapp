import React from 'react';
import ReactDOM from 'react-dom';

//COMPONENTES DE FUNCION
//Algunos compnentes no necesitan almacenar estados por lo que nos podemos
//evitar crear clases, estos componentes se pudes crear a traves de funciones
//estos componentes son aquellos que solo tendrian un metodo render
function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}
  
class Board extends React.Component {
    //el objetivo aqui es guardar la informacion en el Board ya que es el componenete
    //padre asi todos los hijos pueden accer a la informacion]]
    //y como esta todo junto se puede calcular cuando alguien gana desde aqui
    constructor(props){
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIdNext: true,
        }
    }
    handleClick(i) {
        //llamamos a slice para crear una copia del array y no modificarlo
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        squares[i] = this.state.xIdNext ? 'X': 'O';
        this.setState({
            squares: squares,
            xIdNext: !this.state.xIdNext,
        });
      }
    renderSquare(i) {
      return (
            <Square value={this.state.squares[i]} 
                    onClick={() => this.handleClick(i)}
            />
      );
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }