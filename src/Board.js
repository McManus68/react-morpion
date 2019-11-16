import React from 'react';
import Square from './Square';

import './index.css';

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          isWin={this.props.winningLine && this.props.winningLine.includes(i)}
        />
      );
    }
  
    render() {
      let items = [];
      for (var i = 0; i <3; i++) {
        items.push(<div className="board-row"></div>);
        for (var j = 0; j <3; j++) {
          items.push(this.renderSquare(i*3 + j));
        }
      }
      return <div>{items}</div>;
    }
  }

  export default Board;