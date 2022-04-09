import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//クラスから関数コンポーネントに書き換え
  function Square(props) {
    return(
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
// class Square extends React.Component {
  //ゲームの状態を管理しなくなった
    //t コンポーネントはコンストラクタで this.state を設定することで、状態を持つことができるようになります。
    // constructor(props){
    //     //JavaScript のクラスでは、サブクラスのコンストラクタを定義する際は常に super を呼ぶ必要があります。
    //     //constructor を持つ React のクラスコンポーネントでは、すべてコンストラクタを super(props) の呼び出しから始めるべき
    //     super(props);
    //     //現在の Square の状態を this.state に保存
    //     //クラスにコンストラクタを追加して state を初期化します：
    //     this.state = {
    //         value: null,
    //     };
    // }
    // render() {
    //   return (
    //       //onClick プロパティに渡しているのは関数であることに注意
    //       //クリックされた時に state の現在値を表示す // onClick ={} ：イベントハンドラ
    //       //クリックされたら常にに再レンダーする
    //     <button 
    //         className="square"
    //         //setState をコンポーネント内で呼び出すと、React はその内部の子コンポーネントも自動的に更新します。
    //         onClick={() => this.props.onClick()}
    //     >
    //       {this.props.value}
    //     </button>
    //   );
    // }

  
  class Board extends React.Component {
    //コンストラクタを追加し、初期 state として 9 個のマス目に対応する 9 個の null 値をセット
    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        //どちらのプレーヤの手番なのかを決める真偽値
        xIsNext: true,
      };
    }
    //handleClickを加える
    handleClick(i){
      //squares を直接変更する代わりに、.slice() を呼んで配列のコピーを作成していること
      const squares = this.state.squares.slice();
      //xIsNext の値を反転させるようにします。
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }

      //renderSquare メソッド内で、props として value という名前の値を Square に渡す
      //squaresという配列から値をつ読み込むように書き換えます
    renderSquare(i) {
      return (
          <Square 
              value={this.state.squares[i]} 
              //Board から Square に関数を渡すことにして、マス目がクリックされた時に Square にその関数を呼んでもらう
              onClick={() => this.handleClick(i)}
          />
      );
    }
  
    render() {
      //どちらのプレーヤの手番なのかを表示を追加
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
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
  