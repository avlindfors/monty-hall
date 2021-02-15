import React, { SyntheticEvent, useState } from "react";
import classnames from "classnames";

import useAxios from "../../hooks/useAxios";
import HttpMethod from "../../enums/HttpMethod";
import ErrorObject from "../../api/ErrorObject";
import type { SimulationResultType } from "../Content";
import HollowCheckboxRadio from "../HollowCheckboxRadio";

type Strategy = "SWAP" | "STICK";

export enum NumberOfSimulationsValue {
  ONE = "ONE",
  TEN_THOUSAND = "TEN_THOUSAND",
  CUSTOM = "CUSTOM",
}

export interface NumberOfSimulationsType {
  type: string;
  value: number | string;
}

const SWAP: Strategy = "SWAP";
const STICK: Strategy = "STICK";

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
    value: "Custom",
  },
};

const DEFAULT_CUSTOM_NUMBER_OF_SIMULATIONS = 25000;

const SIMULATIONS_RADIO = "numberOfSimulationsRadio";
const SIMULATIONS_NUMBER = "numberOfSimulations";
const STRATEGY_RADIO = "strategy-swap-radio";

interface SimulationFormPropsType {
  updateSimulationResult: (result: SimulationResultType | undefined) => void;
}
function SimulationForm({ updateSimulationResult }: SimulationFormPropsType) {
  const [errorObject, setErrorObject] = useState<ErrorObject | undefined>(
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
    setErrorObject(undefined);
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
    setErrorObject(errorObject);
    updateSimulationResult(undefined);
  };

  const { isLoading, performCall } = useAxios({
    url: "/api/v1/simulate",
    method: HttpMethod.POST,
    onResponse: updateSimulationResult,
    onError: handleError,
  });

  const buttonClass = (isSelected: boolean) => {
    return classnames("hollow-checkbox", {
      "border-gray-700": isSelected,
    });
  };

  const isFormInvalid: boolean =
    isNaN(customNumberOfSimulations) &&
    numberOfSimulationsType.type === NumberOfSimulationsValue.CUSTOM;

  return (
    <form onSubmit={submitForm} className="flex flex-col mb-4">
      <h2 className="body-header-mb">Number of simulation rounds</h2>
      <div className="flex flex-col">
        <HollowCheckboxRadio
          radioData={NUMBER_OF_SIMULATIONS[NumberOfSimulationsValue.ONE]}
          isChecked={
            numberOfSimulationsType.type === NumberOfSimulationsValue.ONE
          }
          radioGroup={SIMULATIONS_RADIO}
          onChange={handleChange}
        ></HollowCheckboxRadio>
        <HollowCheckboxRadio
          radioData={
            NUMBER_OF_SIMULATIONS[NumberOfSimulationsValue.TEN_THOUSAND]
          }
          isChecked={
            numberOfSimulationsType.type ===
            NumberOfSimulationsValue.TEN_THOUSAND
          }
          radioGroup={SIMULATIONS_RADIO}
          onChange={handleChange}
        ></HollowCheckboxRadio>
        <HollowCheckboxRadio
          radioData={NUMBER_OF_SIMULATIONS[NumberOfSimulationsValue.CUSTOM]}
          isChecked={
            numberOfSimulationsType.type === NumberOfSimulationsValue.CUSTOM
          }
          radioGroup={SIMULATIONS_RADIO}
          onChange={handleChange}
        ></HollowCheckboxRadio>
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
            numberOfSimulationsType.type !== NumberOfSimulationsValue.CUSTOM ||
            isLoading
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
      <HollowCheckboxRadio
        isChecked={strategy === STICK}
        radioGroup={STRATEGY_RADIO}
        radioData={{ type: STICK, value: "Stick" }}
        onChange={handleChange}
      />
      <HollowCheckboxRadio
        isChecked={strategy === SWAP}
        radioGroup={STRATEGY_RADIO}
        radioData={{ type: SWAP, value: "Swap" }}
        onChange={handleChange}
      />
      <input
        type="submit"
        value={!isLoading ? "Simulate" : "Simulating"}
        disabled={isFormInvalid || isLoading}
        className="submit-button"
      ></input>
      <div
        className={classnames("pt-4 text-xs", {
          hidden: !errorObject,
        })}
      >
        {errorObject && (
          <p className="text-red-500">{errorObject.description}</p>
        )}
      </div>
    </form>
  );
}

export default SimulationForm;
