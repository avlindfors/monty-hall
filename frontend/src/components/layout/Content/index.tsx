import React, { SyntheticEvent, useState } from "react";
import classnames from "classnames";

import useAxios from "../../../hooks/useAxios";
import HttpMethod from "../../../enums/HttpMethod";
import ErrorObject from "../../../api/ErrorObject";

enum Strategy {
  STICK = 'STICK',
  SWAP = 'SWAP',
}

enum NumberOfSimulations {
  ONE = 'ONE',
  TEN_THOUSAND = 'TEN_THOUSAND',
  CUSTOM = 'CUSTOM',
}

interface SimulationResultType {
  totalSimulations: number;
  totalWins: number;
}

const DEFAULT_CUSTOM_NUMBER_OF_SIMULATIONS = 25000;

function Content() {
  const [simulationResult, setSimulationResult] = useState<
    SimulationResultType | undefined
  >(undefined);

  const [postError, setPostError] = useState<ErrorObject | undefined>(
    undefined
  );

  const handleError = (errorObject : ErrorObject) => {
    setPostError(errorObject);
    setSimulationResult(undefined);
  }

  const [numberOfSimulationsType, setNumberOfSimulationsType] = useState<
    string
  >(NumberOfSimulations.CUSTOM);

  const [fixedNumberOfSimulations, setFixedNumberOfSimulations] = useState<
    number
  >(1);

  const [customNumberOfSimulations, setCustomNumberOfSimulations] = useState<
    any
  >(DEFAULT_CUSTOM_NUMBER_OF_SIMULATIONS);

  const [strategy, setStrategy] = useState(Strategy.STICK);

  const submitForm = (e: React.SyntheticEvent) => {
    var actualNumberOfSimulations;
    if (numberOfSimulationsType === NumberOfSimulations.CUSTOM) {
      actualNumberOfSimulations = customNumberOfSimulations;
    } else {
      actualNumberOfSimulations = fixedNumberOfSimulations;
    }
    setPostError(undefined);
    performCall({
      numberOfSimulations: actualNumberOfSimulations,
      stickOrSwapStrategy: strategy,
    });
    e.preventDefault();
  };

  const handleNumberOfSimulationsChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const numberOfSimulationsType = target.value;
    switch (numberOfSimulationsType) {
      case NumberOfSimulations.ONE:
        setFixedNumberOfSimulations(1);
        break;
      case NumberOfSimulations.TEN_THOUSAND:
        setFixedNumberOfSimulations(10000);
        break;
      default:
        setFixedNumberOfSimulations(1);
        break;
    }
    setNumberOfSimulationsType(numberOfSimulationsType);
  };

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    switch (target.type) {
      case 'radio':
        handleRadioUpdate(target);
        break;
      case 'number':
        handleNumberUpdate(target);
        break;
      default:
        throw new Error('Can not handle inputs of type: ' + target.type);
    }
  };

  const handleRadioUpdate = (element: HTMLInputElement) => {
    const { value } = element;
    if (value === Strategy.STICK) {
      setStrategy(Strategy.STICK);
    } else {
      setStrategy(Strategy.SWAP);
    }
  };

  const handleNumberUpdate = (element: HTMLInputElement) => {
    const { value } = element;
    setCustomNumberOfSimulations(parseInt(value));
  };

  const { isLoading, performCall } = useAxios({
    url: "/api/v1/simulate",
    method: HttpMethod.POST,
    onResponse: setSimulationResult,
    onError: handleError,
  });

  const isFormInvalid: boolean =
    isNaN(customNumberOfSimulations) &&
    numberOfSimulationsType === NumberOfSimulations.CUSTOM;

  const madeTheRightChoice =
    simulationResult !== undefined &&
    simulationResult.totalWins >= simulationResult.totalSimulations / 2;

  const buttonClass = (isSelected: boolean) => {
    return classnames('hollow-checkbox', {
      'border-gray-700': isSelected,
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
                  numberOfSimulationsType === NumberOfSimulations.ONE
                )}
              >
                1
                <input
                  className="hidden-input"
                  type="radio"
                  name="numberOfSimulationsRadio"
                  id="1-simulationsRadio"
                  value={NumberOfSimulations.ONE}
                  checked={numberOfSimulationsType === NumberOfSimulations.ONE}
                  onChange={handleNumberOfSimulationsChange}
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="10000-simulationsRadio"
                className={buttonClass(
                  numberOfSimulationsType === NumberOfSimulations.TEN_THOUSAND
                )}
              >
                10000
                <input
                  className="hidden-input"
                  type="radio"
                  name="numberOfSimulationsRadio"
                  id="10000-simulationsRadio"
                  value={NumberOfSimulations.TEN_THOUSAND}
                  checked={
                    numberOfSimulationsType === NumberOfSimulations.TEN_THOUSAND
                  }
                  onChange={handleNumberOfSimulationsChange}
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="custom-simulationsRadio"
                className={buttonClass(
                  numberOfSimulationsType === NumberOfSimulations.CUSTOM
                )}
              >
                Custom
                <input
                  className="hidden-input"
                  type="radio"
                  name="numberOfSimulationsRadio"
                  id="custom-simulationsRadio"
                  value={NumberOfSimulations.CUSTOM}
                  checked={
                    numberOfSimulationsType === NumberOfSimulations.CUSTOM
                  }
                  onChange={handleNumberOfSimulationsChange}
                />
              </label>
            </div>
          </div>

          <label>
            <span
              className={classnames(
                'text-sm text-gray-600 inline-block transition-opacity',
                {
                  'opacity-50':
                    numberOfSimulationsType !== NumberOfSimulations.CUSTOM,
                }
              )}
            >
              Custom number of simulations
            </span>
            <input
              className="underlined-input mb-6"
              disabled={numberOfSimulationsType !== NumberOfSimulations.CUSTOM}
              type="number"
              name="numberOfSimulations"
              min={0}
              value={customNumberOfSimulations}
              placeholder=""
              data-testid="customNumberOfSimulationsInput"
              onChange={handleChange}
            />
          </label>

          <h2 className="body-header-mb">Stick or Swap</h2>

          <label
            htmlFor="stick"
            className={buttonClass(strategy === Strategy.STICK)}
          >
            Stick
            <input
              className="hidden-input"
              type="radio"
              name="strategy-stick-radio"
              id="stick"
              value={Strategy.STICK}
              checked={strategy === Strategy.STICK}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="swap"
            className={buttonClass(strategy === Strategy.SWAP)}
          >
            Swap
            <input
              className="hidden-input"
              type="radio"
              name="strategy-swap-radio"
              id="swap"
              value={Strategy.SWAP}
              checked={strategy === Strategy.SWAP}
              onChange={handleChange}
            />
          </label>
          <input
            type="submit"
            value={!isLoading ? "Simulate" : "Simulating"}
            disabled={isFormInvalid || isLoading}
            className="submit-button"
          ></input>
          <div className={classnames("pt-4 text-xs",{
            hidden: !postError
          })}>
            {postError && <p className="text-red-500">{postError.description}</p>}
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
