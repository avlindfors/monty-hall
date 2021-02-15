import React, { SyntheticEvent } from "react";
import classnames from "classnames";
import { NumberOfSimulationsType } from "../SimulationForm";

interface HollowCheckboxRadioPropsType {
  isChecked: boolean;
  radioGroup: string;
  radioData: NumberOfSimulationsType;
  onChange: (event: SyntheticEvent) => void;
}

function HollowCheckboxRadio({
  isChecked,
  radioGroup,
  radioData,
  onChange,
}: HollowCheckboxRadioPropsType) {
  const buttonClass = (isSelected: boolean) => {
    return classnames("hollow-checkbox", {
      "border-gray-700": isSelected,
    });
  };

  return (
    <label htmlFor={radioData.type + "-id"} className={buttonClass(isChecked)}>
      {radioData.value}
      <input
        className="hidden-input"
        type="radio"
        name={radioGroup}
        id={radioData.type + "-id"}
        value={radioData.type}
        checked={isChecked}
        onChange={onChange}
      />
    </label>
  );
}

export default HollowCheckboxRadio;
