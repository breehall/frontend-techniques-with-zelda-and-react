import { useState, useEffect } from "react";

// Default state for both versions of the TriforceTap component
const defaultState = {
  triforceTaps: 283,
  allowSelfTap: true,
  coolDown: 0,
};

const TriforceTap = ({
  showExampleWithCoolDown,
}: {
  showExampleWithCoolDown: boolean;
}) => {
  return (
    <>
      {showExampleWithCoolDown ? (
        <TriforceTap__WithCoolDown />
      ) : (
        <TriforceTap__WithoutCoolDown />
      )}
    </>
  );
};

/**
 * TriforceTap__WithoutCoolDown is an example of useState that calculates the next state based on the previous state.
 * Tapping button will disable the button until the page is refreshed.
 */

const TriforceTap__WithoutCoolDown = () => {
  const [triforceTaps, setTriforceTaps] = useState(defaultState.triforceTaps);
  const [allowSelfTap, setAllowSelfTap] = useState(defaultState.allowSelfTap);

  return (
    <section className="flex justify-between mt-4">
      <div className="flex items-center space-x-3">
        <img src="/triforce.png" className=" h-8 inline" />
        <span className="bold text-2xl">{triforceTaps}</span>{" "}
      </div>
      <button
        onClick={() => {
          setTriforceTaps((prevTaps) => prevTaps + 1);
          setAllowSelfTap(false);
        }}
        disabled={!allowSelfTap}
        className="bg-green-900 text-white rounded flex items-center px-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="/triforce.png" alt="Triforce icon" className="h-6 inline" />{" "}
        Triforce Tap Link
      </button>
    </section>
  );
};

/**
 * TriforceTap__WithCoolDown is an example of useState that maintains three pieces of state in a single object.
 * This example uses a cool down period to disable the button for 3 seconds after each tap.
 */
const TriforceTap__WithCoolDown = () => {
  const [state, setState] = useState(defaultState);

  // Cool down period in seconds
  const coolDownPeriod = 3;

  const handleTap = () => {
    setState((prevState) => ({
      ...prevState,
      triforceTaps: prevState.triforceTaps + 1,
      allowSelfTap: false,
      coolDown: coolDownPeriod,
    }));
  };

  const handleCoolDown = () => {
    if (state.coolDown > 0) {
      const timer = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          coolDown: prevState.coolDown - 1,
          allowSelfTap: prevState.coolDown - 1 <= 0,
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  };

  useEffect(handleCoolDown, [state.coolDown]);

  return (
    <section className="flex justify-between mt-4">
      <div className="flex items-center space-x-3">
        <img src="/triforce.png" className=" h-8 inline" />
        <span className="bold text-2xl">{state.triforceTaps}</span>{" "}
      </div>
      <button
        onClick={handleTap}
        disabled={!state.allowSelfTap}
        className="bg-green-600 text-white rounded flex items-center px-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="/triforce.png" alt="Triforce icon" className="h-6 inline" />{" "}
        TriForce Tap Link
      </button>
    </section>
  );
};

export default TriforceTap;
