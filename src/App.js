import { useState } from "react";

function App() {
  // representing a journey by at each stop how many people get off the vehicle and what was the accumulated fare.

  const [getOffs, setGetOffs] = useState([]); // {accumulatedFare, numberOfPassengers}

  const fairFares = getOffs.reduce((fees, currentGetOff, currentIndex) => {
    const previousAccumulatedFare =
      getOffs[currentIndex - 1]?.accumulatedFare ?? 0;

    const marginalFare =
      currentGetOff.accumulatedFare - previousAccumulatedFare;

    const numberOfPassengersOnCar = getOffs
      .map((getOff) => getOff.numberOfPassengers)
      .slice(currentIndex)
      .reduce((previousValue, currentValue) => previousValue + currentValue);

    const marginalFairFare = marginalFare / numberOfPassengersOnCar;

    fees.push((fees[currentIndex - 1] ?? 0) + marginalFairFare);
    return fees;
  }, []);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
