import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    //t コンポーネントはコンストラクタで this.state を設定することで、状態を持つことができるようになります。
    constructor(props){
        //JavaScript のクラスでは、サブクラスのコンストラクタを定義する際は常に super を呼ぶ必要があります。
        //constructor を持つ React のクラスコンポーネントでは、すべてコンストラクタを super(props) の呼び出しから始めるべき
        super(props);
        //現在の Square の状態を this.state に保存
        //クラスにコンストラクタを追加して state を初期化します：
        this.state = {
            value: null,
        };
    }
    render() {
      return (
          //onClick プロパティに渡しているのは関数であることに注意
          //クリックされた時に state の現在値を表示す // onClick ={} ：イベントハンドラ
          //クリックされたら常にに再レンダーする
        <button 
            className="square"
            //setState をコンポーネント内で呼び出すと、React はその内部の子コンポーネントも自動的に更新します。
            onClick={() => this.setState({value:'X'})}
        >
          {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
      //renderSquare メソッド内で、props として value という名前の値を Square に渡す
    renderSquare(i) {
      return <Square value={i} />;
    }
  
    render() {
      const status = 'Next player: X';
  
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
  