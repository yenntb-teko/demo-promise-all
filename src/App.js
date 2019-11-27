import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // demo promise
  const timeOutResolve = t => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Completed in ${t}ms`);
      }, t);
    });
  };

  const createArray = () => {
    let array = [];
    for (let i = 0; i < 50; i += 1) {
      array.push(100);
    }
    return array;
  };

  const callPromise = async () => {
    const startTime = Date.now();
    const array = createArray();
    for (let i = 0; i < array.length; i += 1) {
      await timeOutResolve(array[i]);
    }
    const endTime = Date.now();
    alert(endTime - startTime);
  };

  const promiseAll = async array => {
    for (let i = 0; i < array.length; i += 100) {
      const subArray = array.slice(i, i + 100);
      let promises = [];
      subArray.map(item => promises.push(timeOutResolve(item)));
      await Promise.all(promises).then(() => {
        promises = [];
      });
    }
    return Date.now();
  };

  const callPromiseAll = async () => {
    const startTime = Date.now();
    const array = createArray();
    const endTime = await promiseAll(array);
    alert(endTime - startTime);
  };

  const skus = [
    "191100707",
    "191100706",
    "191100705",
    "191100701",
    "191100702",
    "191100699",
    "1202938",
    "191100697",
    "191100695",
    "191100756"
  ];

  // initial code
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
        <div>
          <button type="button" onClick={callPromiseAll}>
            use Promise All
          </button>
          <button type="button" onClick={callPromise}>
            use Promise
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
