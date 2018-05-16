import { Map } from "immutable";

const MOVE = "MOVE";
const WINNER = "WINNER";

export const move = (turn, position) => ({ type: MOVE, turn, position });
export const gameWinner = winner => ({ type: GAMEWINNER, winner });

export function turnReducer(turn = "X", action) {
  if (action.type === MOVE) return turn === "X" ? "O" : "X";
  return turn;
}

export function boardReducer(board = Map(), action) {
  if (action.type === MOVE) return board.setIn(action.position, action.turn);
  return board;
}

export function winnerReducer(winner = null, action) {
  if (action.type === GAMEWINNER) return winner ? action.winner : null;
  return winner;
}

export default function reducer(state = {}, action) {
  return {
    board: boardReducer(state.board, action),
    turn: turnReducer(state.turn, action),
    winner: winnerReducer(state.winner, winner, action)
  };
}

/*state{
  board
  turn
  winner: null
}

*/

// export default function reducer(state = initialState, action) {
//   let newState = Object.assign({}, state);
//   switch (action.type) {
//     case MOVE: {
//       const newTurn = action.turn === 'X' ? 'O' : 'X';
//       newState.board = newState.board.setIn(action.position, action.turn);
//       newState.turn = newTurn;
//       return newState;
//     }
//     default:
//       return state;
//   }
// }
