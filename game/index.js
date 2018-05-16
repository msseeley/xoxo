import { Map } from 'immutable';

const MOVE = 'MOVE';
const TURN = 'TURN';
const POSITION = 'POSITION';

// export const turn = turn => ({ type: MOVE, turn });
// export const position = position => ({ type: MOVE, position });
export const move = (turn, position) => ({ type: MOVE, turn, position });

const initialState = {
  turn: 'X',
  board: Map()
};

export function turnReducer(turn = 'X', action) {
  if (action.type === MOVE) return turn === 'X' ? 'O' : 'X';
  return turn;
}

export function boardReducer(board = Map(), action) {
  if (action.type === MOVE) return board.setIn(action.coord, action.player);
  return board;
}

export default function reducer(state = initialState, action) {
  return {
    board: boardReducer(state.board, action),
    turn: turnReducer(state.turn, action)
  };
}

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
