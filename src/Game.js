import React from 'react';
import './index.css';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null),
            positions: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        sortAscending: true,
        draw: false
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const positions = current.positions.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      positions[this.state.stepNumber] = i;
      const draw = squares.filter(x => x === "X" || x === "O").length == 9;
      this.setState({
        history: history.concat([
          {
            squares: squares,
            positions: positions
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        draw: draw
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

    sort(step) {
      this.setState({
        sortAscending: !this.state.sortAscending
      });
    }
  
    render() {
      const history = this.state.history;
      const draw = this.state.draw;
      const current = history[this.state.stepNumber];
      const result = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        let text = {
          __html: `Go to game start`
        };
        if (move) {
          let position = step.positions[move-1];
          let x = Math.ceil(position % 3);
          let y = Math.floor(position / 3);
          text.__html = 'Go to move # <B>' + move + '</B>(' + x + ',' + y + ')';
        }

        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              <span dangerouslySetInnerHTML={text} />
            </button>
          </li>
        );
      });
  
      let status;
      if (draw) {
        status = "Draw game";
      }
      else if (result) {
        status = "Winner: " + result.winner;
      }
        else {
          status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winningLine={result ? result.line : null}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
              <button onClick={() => this.sort()}>Sort</button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  export default Game;

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {winner: squares[a], line: lines[i]};
      }
    }
    return null;
  }