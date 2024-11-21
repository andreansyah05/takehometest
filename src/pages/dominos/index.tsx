import React, { useState } from "react";
import DominoCard from "../components/dominocards";

const defaultDominoes = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
  [3, 3],
  [9, 9],
];

function App() {
  const [dominoes, setDominoes] = useState(defaultDominoes);

  const countDoubleNumbers = () => {
    return dominoes.filter(([a, b]) => a === b).length;
  };

  const sortDominoes = (order: string) => {
    const sorted = [...dominoes].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];

      if (sumA === sumB) {
        return order === "asc" ? a[0] - b[0] : b[0] - a[0];
      }

      return order === "asc" ? sumA - sumB : sumB - sumA;
    });

    setDominoes(sorted);
  };

  const flipCards = () => {
    const flipped = dominoes.map(([a, b]) => [b, a]);
    setDominoes(flipped);
  };

  const removeDuplicates = () => {
    const unique = Array.from(
      new Set(dominoes.map(([a, b]) => (a <= b ? `${a}-${b}` : `${b}-${a}`)))
    ).map((str) => str.split("-").map(Number));
    setDominoes(unique);
  };

  const removeByTotal = (total: number) => {
    const filtered = dominoes.filter(([a, b]) => a + b !== total);
    setDominoes(filtered);
  };

  const resetData = () => {
    setDominoes(defaultDominoes);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dominoes</h1>

      <h3 className="text-lg font-semibold mb-2">Source</h3>
      <textarea
        readOnly
        value={JSON.stringify(dominoes)}
        className="border rounded w-full p-2 mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">Double Numbers</h3>
      <p className="text-lg mb-4">{countDoubleNumbers()}</p>
      <div className="grid grid-cols-3 gap-4">
        {dominoes.map(([a, b], index) => (
          <DominoCard key={index} left={a} right={b} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => sortDominoes("asc")}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Sort (ASC)
        </button>
        <button
          onClick={() => sortDominoes("desc")}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Sort (DESC)
        </button>
        <button
          onClick={flipCards}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Flip
        </button>
        <button
          onClick={removeDuplicates}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Remove Dup
        </button>
        <button
          onClick={resetData}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Reset
        </button>
        <input
          type="number"
          placeholder="Input Number"
          className="border rounded px-2 py-1 mb-4 w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.target instanceof HTMLInputElement) {
                removeByTotal(parseInt(e.target.value, 10));
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
