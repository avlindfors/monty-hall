import React, { SyntheticEvent, useState } from "react";
import classnames from "classnames";

import useAxios from "../../hooks/useAxios";
import HttpMethod from "../../enums/HttpMethod";
import ErrorObject from "../../api/ErrorObject";

type Strategy = "SWAP" | "STICK";

interface SimulationResultType {
  totalSimulations: number;
  totalWins: number;
}

enum NumberOfSimulationsValue {
  ONE = "ONE",
  TEN_THOUSAND = "TEN_THOUSAND",
  CUSTOM = "CUSTOM",
}

interface NumberOfSimulationsType {
  type: string;
  value: number | undefined;
}

const NUMBER_OF_SIMULATIONS: {
  [index: string]: NumberOfSimulationsType;
} = {
  ONE: {
    type: NumberOfSimulationsValue.ONE,
    value: 1,
  },
  TEN_THOUSAND: {
    type: NumberOfSimulationsValue.TEN_THOUSAND,
    value: 10000,
  },
  CUSTOM: {
    type: NumberOfSimulationsValue.CUSTOM,
    value: undefined,
  },
};

const DEFAULT_CUSTOM_NUMBER_OF_SIMULATIONS = 25000;

const SWAP = "SWAP";
const STICK = "STICK";

const SIMULATIONS_RADIO = "numberOfSimulationsRadio";
const SIMULATIONS_NUMBER = "numberOfSimulations";
const STRATEGY_RADIO = "strategy-swap-radio";

function Content() {
  const [simulationResult, setSimulationResult] = useState<
    SimulationResultType | undefined
  >(undefined);

  const [postError, setPostError] = useState<ErrorObject | undefined>(
    undefined
  );

  const [numberOfSimulationsType, setNumberOfSimulationsType] = useState<any>(
    NUMBER_OF_SIMULATIONS.CUSTOM
  );

  const [
    customNumberOfSimulations,
    setCustomNumberOfSimulations,
  ] = useState<any>(DEFAULT_CUSTOM_NUMBER_OF_SIMULATIONS);

  const [strategy, setStrategy] = useState<Strategy>("STICK");

  const submitForm = (e: React.SyntheticEvent) => {
    let actualNumberOfSimulations;
    if (numberOfSimulationsType.type === NumberOfSimulationsValue.CUSTOM) {
      actualNumberOfSimulations = customNumberOfSimulations;
    } else {
      actualNumberOfSimulations = numberOfSimulationsType.value;
    }
    setPostError(undefined);
    performCall({
      numberOfSimulations: actualNumberOfSimulations,
      stickOrSwapStrategy: strategy,
    });
    e.preventDefault();
  };

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    switch (name) {
      case SIMULATIONS_RADIO:
        const actualType = NUMBER_OF_SIMULATIONS[value];
        setNumberOfSimulationsType(actualType);
        break;
      case SIMULATIONS_NUMBER:
        setCustomNumberOfSimulations(parseInt(value));
        break;
      case STRATEGY_RADIO:
        setStrategy(value as Strategy);
    }
  };

  const handleError = (errorObject: ErrorObject) => {
    setPostError(errorObject);
    setSimulationResult(undefined);
  };

  const { isLoading, performCall } = useAxios({
    url: "/api/v1/simulate",
    method: HttpMethod.POST,
    onResponse: setSimulationResult,
    onError: handleError,
  });

  const isFormInvalid: boolean =
    isNaN(customNumberOfSimulations) &&
    numberOfSimulationsType.type === NumberOfSimulationsValue.CUSTOM;

  const madeTheRightChoice =
    simulationResult !== undefined &&
    simulationResult.totalWins >= simulationResult.totalSimulations / 2;

  const buttonClass = (isSelected: boolean) => {
    return classnames("hollow-checkbox", {
      "border-gray-700": isSelected,
    });
  };

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
        <h2 className="body-header-mb">Number of simulation rounds</h2>

        <form onSubmit={submitForm} className="flex flex-col mb-4">
          <div className="flex flex-col">
            <div>
              <label
                htmlFor="1-simulationsRadio"
                className={buttonClass(
                  numberOfSimulationsType.type === NumberOfSimulationsValue.ONE
                )}
              >
                1
                <input
                  className="hidden-input"
                  type="radio"
                  name={SIMULATIONS_RADIO}
                  id="1-simulationsRadio"
                  value={NumberOfSimulationsValue.ONE}
                  checked={
                    numberOfSimulationsType.type ===
                    NumberOfSimulationsValue.ONE
                  }
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="10000-simulationsRadio"
                className={buttonClass(
                  numberOfSimulationsType.type ===
                    NumberOfSimulationsValue.TEN_THOUSAND
                )}
              >
                10000
                <input
                  className="hidden-input"
                  type="radio"
                  name={SIMULATIONS_RADIO}
                  id="10000-simulationsRadio"
                  value={NumberOfSimulationsValue.TEN_THOUSAND}
                  checked={
                    numberOfSimulationsType.type ===
                    NumberOfSimulationsValue.TEN_THOUSAND
                  }
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="custom-simulationsRadio"
                className={buttonClass(
                  numberOfSimulationsType.type ===
                    NumberOfSimulationsValue.CUSTOM
                )}
              >
                Custom
                <input
                  className="hidden-input"
                  type="radio"
                  name={SIMULATIONS_RADIO}
                  id="custom-simulationsRadio"
                  value={NumberOfSimulationsValue.CUSTOM}
                  checked={
                    numberOfSimulationsType.type ===
                    NumberOfSimulationsValue.CUSTOM
                  }
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <label>
            <span
              className={classnames(
                "text-sm text-gray-600 inline-block transition-opacity",
                {
                  "opacity-50":
                    numberOfSimulationsType.type !==
                    NumberOfSimulationsValue.CUSTOM,
                }
              )}
            >
              Custom number of simulations
            </span>
            <input
              className="underlined-input mb-6"
              disabled={
                numberOfSimulationsType.type !== NumberOfSimulationsValue.CUSTOM
              }
              type="number"
              name={SIMULATIONS_NUMBER}
              min={0}
              value={customNumberOfSimulations}
              placeholder=""
              data-testid="customNumberOfSimulationsInput"
              onChange={handleChange}
            />
          </label>

          <h2 className="body-header-mb">Stick or Swap</h2>

          <label htmlFor="stick" className={buttonClass(strategy === STICK)}>
            Stick
            <input
              className="hidden-input"
              type="radio"
              name={STRATEGY_RADIO}
              id="stick"
              value={STICK}
              checked={strategy === STICK}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="swap" className={buttonClass(strategy === SWAP)}>
            Swap
            <input
              className="hidden-input"
              type="radio"
              name={STRATEGY_RADIO}
              id="swap"
              value={SWAP}
              checked={strategy === SWAP}
              onChange={handleChange}
            />
          </label>
          <input
            type="submit"
            value={!isLoading ? "Simulate" : "Simulating"}
            disabled={isFormInvalid || isLoading}
            className="submit-button"
          ></input>
          <div
            className={classnames("pt-4 text-xs", {
              hidden: !postError,
            })}
          >
            {postError && (
              <p className="text-red-500">{postError.description}</p>
            )}
          </div>
        </form>
        <div className="text-gray-700 text-sm w-full text-center bg-white py-5 px-1">
          {!simulationResult ? (
            <div>
              <p className="text-gray-600">
                Use the form above to create and run simulations
              </p>
            </div>
          ) : (
            <div className="text-base">
              <p className="mb-1">
                Out of {simulationResult.totalSimulations} simulations you
                picked the right door {simulationResult.totalWins} times!
              </p>
              <output className="font-bold">
                {madeTheRightChoice ? (
                  <p className="text-green-500">
                    You made the right choice!
                    <span
                      className="ml-2 text-2xl"
                      role="img"
                      aria-label="thumbs-up"
                    >
                      👍🏻
                    </span>
                  </p>
                ) : (
                  <p className="text-red-500">
                    You should have swapped!
                    <span
                      className="ml-2 text-2xl"
                      role="img"
                      aria-label="thumbs-down"
                    >
                      👎🏻
                    </span>
                  </p>
                )}
              </output>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Content;
