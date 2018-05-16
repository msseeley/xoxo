import { Map } from "immutable";

const MOVE = "MOVE";

export const move = (turn, position) => ({ type: MOVE, turn, position });

const initialState = {
  turn: "X",
  board: Map()
};

export default function reducer(state = initialState, action) {
  let newState = Object.assign({}, state);
  // console.log(newState);
  switch (action.type) {
    case MOVE:
      const newTurn = action.turn === "X" ? "O" : "X";
      newState.board = newState.board.setIn(action.position, action.turn);
      newState.turn = newTurn;
      console.log(newState);
      return newState;
    default:
      return state;
  }
  // TODO
}
