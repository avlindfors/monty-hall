import React, { useState } from "react";
import SimulationForm from "../SimulationForm";
import SimulationResult from "../SimulationResult";
export interface SimulationResultType {
  totalSimulations: number;
  totalWins: number;
}

function Content() {
  const [simulationResult, setSimulationResult] = useState<
    SimulationResultType | undefined
  >(undefined);

  return (
    <main className="h-full mb-auto flex flex-col items-center justify-center">
      <div className="max-w-xl">
        <p className="body-text">
          Ever wanted to prove the Monty Hall paradox? Ever wondered if you
          should stick with your choice or swap doors?
        </p>
        <p className="body-text mb-6">
          Use our simulator to prove that, in theory, you should always swap!
        </p>
        <SimulationForm updateSimulationResult={setSimulationResult} />
        <div className="text-gray-700 text-sm w-full text-center bg-white py-5 px-1">
          {!simulationResult ? (
            <div>
              <p className="text-gray-600">
                Use the form above to create and run simulations
              </p>
            </div>
          ) : (
            <SimulationResult simulationResult={simulationResult} />
          )}
        </div>
      </div>
    </main>
  );
}

export default Content;
