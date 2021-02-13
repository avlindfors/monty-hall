import React, { SyntheticEvent, useState } from "react";

enum StickOrSwap {
  STICK = "STICK",
  SWAP = "SWAP",
}

function Content() {
  const [numberOfSimulations, setNumberOfSimulations] = useState<number>(0);
  const [stickOrSwap, setStickOrSwap] = useState(StickOrSwap.STICK);

  const submitForm = (e: React.SyntheticEvent) => {
    console.log("Sending");
    console.log(numberOfSimulations, stickOrSwap);
    e.preventDefault();
  };

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    switch (target.type) {
      case "radio":
        handleRadioUpdate(target);
        break;
      case "number":
        handleNumberUpdate(target);
        break;
      default:
        throw new Error("Can not handle inputs of type: " + target.type);
    }
  };

  const handleRadioUpdate = (element: HTMLInputElement) => {
    const { value } = element;
    if (value === StickOrSwap.STICK) {
      setStickOrSwap(StickOrSwap.STICK);
    } else {
      setStickOrSwap(StickOrSwap.SWAP);
    }
  };

  const handleNumberUpdate = (element: HTMLInputElement) => {
    setNumberOfSimulations(parseInt(element.value));
  };

  return (
    <main className="h-full mb-auto py-4">
      <h2 className="text-xl">Simulation</h2>
      <form onSubmit={submitForm}>
        <label>
          <p>Number of simulations</p>
          <input
            type="number"
            name="numberOfSimulations"
            max="10000"
            onChange={handleChange}
          />
        </label>
        <p>Stick or Swap?</p>
        <div>
          <input
            type="radio"
            name="stickOrSwap"
            value={StickOrSwap.STICK}
            id="stick"
            checked={stickOrSwap === StickOrSwap.STICK}
            onChange={handleChange}
          />
          <label htmlFor="stick">Stick</label>
        </div>
        <div>
          <input
            type="radio"
            name="stickOrSwap"
            value={StickOrSwap.SWAP}
            id="swap"
            checked={stickOrSwap === StickOrSwap.SWAP}
            onChange={handleChange}
          />
          <label htmlFor="swap">Swap</label>
        </div>
        <input type="submit" value="Simulate"></input>
      </form>
    </main>
  );
}

export default Content;
