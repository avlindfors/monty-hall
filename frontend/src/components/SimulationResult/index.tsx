import React from "react";
import { SimulationResultType } from "../Content";

interface SimulationResultPropsType {
  simulationResult: SimulationResultType;
}
function SimulationResult({ simulationResult }: SimulationResultPropsType) {
  const isSuccessfulPrediction =
    simulationResult.totalWins >= simulationResult.totalSimulations / 2;

  return (
    <output className="text-base">
      <p className="mb-1">
        Out of {simulationResult.totalSimulations} simulations you picked the
        right door {simulationResult.totalWins} times!
      </p>
      <div className="font-bold">
        {isSuccessfulPrediction ? (
          <p className="text-green-500">
            You made the right choice!
            <span className="ml-2 text-2xl" role="img" aria-label="thumbs-up">
              👍🏻
            </span>
          </p>
        ) : (
          <p className="text-red-500">
            You should have swapped!
            <span className="ml-2 text-2xl" role="img" aria-label="thumbs-down">
              👎🏻
            </span>
          </p>
        )}
      </div>
    </output>
  );
}

export default SimulationResult;
