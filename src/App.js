import { Dialog } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

function App() {
  // representing a journey by at each stop how many people get off the vehicle and what was the accumulated fare.

  const [getOffs, setGetOffs] = useState([]); // {accumulatedFare, numberOfPassengers}

  let [isOpen, setIsOpen] = useState(false);

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

  console.log(fairFares);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={() => setIsOpen(true)}>Down Car</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Formik
            initialValues={{
              numberOfPassengers: "",
              accumulatedFare: "",
              stopName: "",
            }}
            onSubmit={(values) => {
              setGetOffs((getOffs) => [...getOffs, values]);
            }}
          >
            {(formik) => {
              return (
                <Form>
                  <Field name="numberOfPassengers" type="number" step="1" />
                  <Field name="accumulatedFare" type="number" />
                  <Field name="stopName" type="text" />
                  <button type="submit">Submit</button>
                </Form>
              );
            }}
          </Formik>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default App;
