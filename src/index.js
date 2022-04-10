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
    //boardからGamesへStateのリフトアップをするために、boardから削除
    //コンストラクタを追加し、初期 state として 9 個のマス目に対応する 9 個の null 値をセット
    // constructor(props){
    //   super(props);
    //   this.state = {
    //     squares: Array(9).fill(null),
    //     //どちらのプレーヤの手番なのかを決める真偽値
    //     xIsNext: true,
    //   };
    // }
    // //handleClickを加える
    // handleClick(i){
    //   //squares を直接変更する代わりに、.slice() を呼んで配列のコピーを作成していること
    //   const squares = this.state.squares.slice();
    //   // handleClick を書き換えて、ゲームの決着が既についている場合やクリックされたマス目が既に埋まっている場合に早期に return する
    //   if (calculateWinner(squares) || squares[i]){
    //     return;
    //   }
    //   //xIsNext の値を反転させるようにします。
    //   squares[i] = this.state.xIsNext ? 'X' : 'O';
    //   this.setState({
    //     squares: squares,
    //     xIsNext: !this.state.xIsNext,
    //   });
    // }

      //renderSquare メソッド内で、props として value という名前の値を Square に渡す
      //squaresという配列から値をつ読み込むように書き換えます
    renderSquare(i) {
      return (
          <Square 
              value={this.props.squares[i]} 
              //Board から Square に関数を渡すことにして、マス目がクリックされた時に Square にその関数を呼んでもらう
              //Square の位置を onClick ハンドラに渡してどのマス目がクリックされたのかを伝えるようにします。
              onClick={() => this.props.onClick(i)}
          />
      );
    }
  
    render() {
      //render 関数内で calculateWinner(squares) を呼び出して、いずれかのプレーヤが勝利したかどうか判定します。
      // const winner = calculateWinner(this.state.squares);
      // let status;
      // if(winner){
      //   status = 'winner: ' + winner;
      // }else{
      //   //どちらのプレーヤの手番なのかを表示を追加
      //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // }
      
      return (
        <div>
          {/* <div className="status">{status}</div> */}
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
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares:Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }

    //bordからGameにhandleClickを加える
    handleClick(i){
      //これにより、「時間の巻き戻し」をしてからその時点で新しい着手を起こした場合に、
      //そこから見て「将来」にある履歴（もはや正しくなくなったもの）を確実に捨て去ることができます。
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length -1];
      const squares = current.squares.slice();
      // handleClick を書き換えて、ゲームの決着が既についている場合やクリックされたマス目が既に埋まっている場合に早期に return する
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      //xIsNext の値を反転させるようにします。
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        //concat() は元の配列をミューテートしないため、こちらを利用します。
        history: history.concat([
          {
          squares: squares,
          }
        ]),
        // stepNumber は現在ユーザに見せている着手を反映しています。新しい着手が発生した場合は
        //this.setState の引数の一部として stepNumber: history.length を加えることで、stepNumber を更新する必要があります。
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
    //jumpTo メソッドを定義してその stepNumber が更新されるようにします。
    //また更新しようとしている stepNumber の値が偶数だった場合は xIsNext を true に設定します。
    // setState で直接指定されたプロパティのみを更新しほかの state はそのまま残す
    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      //ゲームのステータステキストの決定や表示の際に最新の履歴が使われるようにします。
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      //history 配列をループ処理する部分
      const moves = history.map((step, move) =>{
        const desc = move ? 
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}
            </button>
          </li>
        )
      }
      )
      let status;
      if(winner){
        status = 'Winner: ' + winner;
      } else{
        status = 'Next player: ' +(this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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
  
  //ゲーム勝者の判定
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