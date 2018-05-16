import inquirer from "inquirer";

import gameReducer, { move, gameWinner } from "./game";
import { createStore } from "redux";

const printBoard = () => {
  const { board } = game.getState();
  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      process.stdout.write(board.getIn([r, c], "_"));
    }
    process.stdout.write("\n");
  }
};

const getInput = player => async () => {
  const { turn } = game.getState();
  if (turn !== player) return;
  const ans = await inquirer.prompt([
    {
      type: "input",
      name: "coord",
      message: `${turn}'s move (row,col):`
    }
  ]);
  const [row = 0, col = 0] = ans.coord.split(/[,\s+]/).map(x => +x);
  game.dispatch(move(turn, [row, col]));
};

// Create the store
const game = createStore(gameReducer);

const winner = () => {
  const { board } = game.getState();

  // Building an array of coordinates
  let arr = [];
  for (let i = 0; i < 3; ++i) {
    let row = [];
    for (let k = 0; k < 3; ++k) {
      row.push([i, k]);
    }
    arr.push(row);
  }

  const row1 = arr[0];
  const row2 = arr[1];
  const row3 = arr[2];

  const top = streak(board, row1);
  const middle = streak(board, row2);
  const bottom = streak(board, row3);
  const diag1 = streak(board, [[0, 0], [1, 1], [2, 2]]);
  const diag2 = streak(board, [[2, 0], [1, 1], [0, 2]]);

  let result;
  if (top) {
    result = top;
  } else if (middle) {
    result = middle;
  } else if (bottom) {
    result = bottom;
  } else if (diag1) {
    result = diag1;
  } else if (diag2) {
    result = diag2;
  } else {
    return "DRAW!";
  }

  console.log("The winner is ", result);
  game.dispatch(gameWinner(result));
};

const streak = (board, coords) => {
  if (
    board.getIn(coords[0]) === board.getIn(coords[1]) &&
    board.getIn(coords[0]) === board.getIn(coords[2])
  ) {
    return board.getIn(coords[0]);
  }
};

game.subscribe(winner);

// Debug: Print the state
game.subscribe(() => console.log(game.getState()));

game.subscribe(printBoard);
game.subscribe(getInput("X"));
game.subscribe(getInput("O"));

// We dispatch a dummy START action to call all our
// subscribers the first time.
game.dispatch({ type: "START" });
