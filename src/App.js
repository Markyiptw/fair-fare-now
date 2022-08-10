import logo from "./logo.svg";
import "./App.css";

function App() {
  // representing a journey by at each stop how many people get off the vehicle and what was the accumulated fare.

  const [getOffs, setGetOffs] = useState(); // {accumulatedFare, numberOfPassengers}

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
