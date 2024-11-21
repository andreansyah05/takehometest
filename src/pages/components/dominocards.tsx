import React from "react";

function DominoCard({ left, right }: any) {
  return (
    <div className="flex flex-col items-center justify-center border border-gray-400 rounded w-16 h-24 bg-white text-lg font-bold">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

export default DominoCard;
