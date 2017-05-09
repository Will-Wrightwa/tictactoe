const React = require('react');
const Component = React.Component
const ReactDOM = require('react-dom');

class Board extends Component {
  constructor(props) {
    super(props)
    this.players = ['X','💩']
    this.state = {
      board:[null,null,null,
            null,null,null,
            null,null,null],
      turn:0,
      gameState:null
    }
    this.placePiece = this.placePiece.bind(this);
    this.restart = this.restart.bind(this);
  }
  render(){

    return (
      <div className="board" >
        { this.state.board.map((e, i)=>(
          <div className="tile" key={i} onClick={e===null && this.state.gameState ===null? this.placePiece.bind(null,i):''} >
            <h1>{this.players[e]} </h1>
          </div>)
        )}
        <h1 className="restart" onClick={this.restart}>↺</h1>
      </div>
    )
  }
  componentDidMount(){
    document.addEventListener("keyup",({key})=>{if(key==="Enter")this.restart();})
  }
  placePiece(key){
    let board = this.state.board.slice()
    board[key] = this.state.turn % 2

    this.setState({
      board: board,
      turn: this.state.turn + 1,
      gameState:this.gameState(board)
    })
  }
  gameState(board){   // need to clean this up!!!!!
    const add = (a,b)=>a+b
    let r1 = board.slice(0,3)
    let r2 = board.slice(3,6)
    let r3 = board.slice(6,9)
    let arr = [r1,r2,r3,
      [r1[0],r2[0],r3[0]],
      [r1[1],r2[1],r3[1]],
      [r1[2],r2[2],r3[2]],
      [r1[0],r2[1],r3[2]],
      [r1[2],r2[1],r3[0]]]
      let out = null
    arr.forEach((e)=>{
      if(e.every((t)=>t===0))out = '0 wins';
      if(e.every((t)=>t===1))out = '1 wins';
    })
    if(out){console.log(out)}
    if(board.every((e)=>e !== null))return out ||'Tie';
    return out
  }
  restart(){
    this.setState({
      board:[null,null,null,
            null,null,null,
            null,null,null],
      turn:0,
      gameState:null
    })
  }
}



module.exports = Board;
