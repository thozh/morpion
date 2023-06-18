import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Cell from "~/components/Cell";

const INITIAL_GRID = Array(9).fill("") as string[];
const PLAYER = "X";
const COMPUTER = "O";
const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // top left to bottom right diagonal
  [2, 4, 6], // top right to bottom left diagonal
] as const;

export default function Home() {
  const [grid, setGrid] = useState<string[]>(INITIAL_GRID);
  const [nextPlayer, setNextPlayer] = useState<string>(PLAYER);
  const [winningPlayer, setWinningPlayer] = useState<string | null>(null);
  const [cellsClickedCount, setCellsClickedCount] = useState(0);

  const handleClick = (idx: number) => {
    if (grid[idx] !== "" || winningPlayer !== null) return;
    setCellsClickedCount(cellsClickedCount + 1);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[idx] = nextPlayer;
      setNextPlayer(nextPlayer === PLAYER ? COMPUTER : PLAYER);

      return newGrid;
    });
  };

  const resetGame = () => {
    setWinningPlayer(null);
    setCellsClickedCount(0);
    setGrid(INITIAL_GRID);
  };

  const checkWin = useCallback(() => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const combination = WINNING_COMBINATIONS[i];
      if (
        combination &&
        grid[combination[0]] === grid[combination[1]] &&
        grid[combination[1]] === grid[combination[2]] &&
        grid[combination[0]] !== ""
      ) {
        const newWinningPlayer = grid[combination[0]];
        if (newWinningPlayer !== undefined) {
          setWinningPlayer(newWinningPlayer);
        }
      }
    }
    return null;
  }, [grid]);

  useEffect(() => {
    checkWin();
  }, [checkWin, grid]);

  return (
    <>
      <Head>
        <title>Morpion</title>
        <meta name="description" content="Jeu en ligne du morpion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0f766e] to-[#042f2e]">
        <div className="container flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 grid-rows-3">
            {grid.map((value, idx) => (
              <Cell key={idx} onClick={() => handleClick(idx)}>
                {value}
              </Cell>
            ))}
          </div>

          {winningPlayer && (
            <h1 className="text-2xl text-teal-400">
              {winningPlayer} won the game!
            </h1>
          )}

          {cellsClickedCount === 9 && !winningPlayer && (
            <h1 className="text-2xl text-teal-400">Draw!</h1>
          )}

          <button className="text-2xl text-teal-200" onClick={resetGame}>
            Restart the game
          </button>
        </div>
      </main>
    </>
  );
}
