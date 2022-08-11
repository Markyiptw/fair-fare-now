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

  return (
    <>
      <div className="mx-2">
        <header className="flex justify-between items-center mt-8">
          <h1 className="text-3xl font-bold mt-2">旅程</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            + 有人落車
          </button>
        </header>
        <ul className="space-y-2 mt-5">
          {getOffs.length === 0
            ? "未有人落車..."
            : getOffs.map(
                ({ numberOfPassengers, accumulatedFare, stopName }, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border border-stone-400 rounded px-2 py-2"
                  >
                    <div>
                      <div className="text-lg font-semibold">{stopName}</div>
                      <div className="text-base font-medium">
                        咪標跳到${accumulatedFare.toFixed(2)}
                      </div>
                      <div className="text-base font-medium">
                        {numberOfPassengers}個人落車
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setGetOffs((getOffs) =>
                          getOffs.filter(
                            (getOff, newIndex) => index !== newIndex
                          )
                        )
                      }
                      className="border-2 border-red-200 text-red-500 px-4 py-2 rounded-md"
                    >
                      delete
                    </button>
                  </li>
                )
              )}
        </ul>
        <button
          className="bg-black text-white px-4 py-2 rounded-md block w-full mt-4 font-semibold"
          type="button"
          onClick={() => {
            alert(
              getOffs
                .map(
                  ({ numberOfPassengers, accumulatedFare, stopName }, index) =>
                    `${stopName}有${numberOfPassengers}個人落車，位位$${fairFares[
                      index
                    ].toFixed(2)}~`
                )
                .join("\n")
            );
          }}
        >
          落曬車，埋數！
        </button>

        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center">
            <Dialog.Panel
              className={"flex-grow bg-white rounded mx-2 px-2 py-5"}
            >
              <Formik
                initialValues={{
                  numberOfPassengers: "",
                  accumulatedFare: "",
                  stopName: "",
                }}
                onSubmit={(values) => {
                  setGetOffs((getOffs) => [...getOffs, values]);
                  setIsOpen(false);
                }}
              >
                {(formik) => {
                  return (
                    <Form className="space-y-3">
                      <div>
                        <label className="block text-lg font-medium text-gray-700">
                          站名
                        </label>
                        <Field
                          name="stopName"
                          type="text"
                          placeholder="諗個你方便計數嘅名"
                          className="block w-full rounded-md px-4 py-2 mt-1 text-sm outline-none border-2 border-gray-200 focus:border-indigo-500"
                          required
                          autocomplete="off"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700">
                          人數
                        </label>
                        <Field
                          name="numberOfPassengers"
                          type="number"
                          step="1"
                          className="block w-full rounded-md px-4 py-2 mt-1 text-sm outline-none border-2 border-gray-200 focus:border-indigo-500"
                          placeholder="今個站有幾多人落車？"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700">
                          累計車費
                        </label>
                        <Field
                          name="accumulatedFare"
                          className="block w-full rounded-md px-4 py-2 mt-1 text-sm outline-none border-2 border-gray-200 focus:border-indigo-500"
                          placeholder="咪標show緊幾錢？"
                          type="number"
                          step="0.1"
                          required
                        />
                      </div>

                      <button
                        className="bg-black text-white px-4 py-2 rounded-md block w-full"
                        type="submit"
                      >
                        有落
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default App;
