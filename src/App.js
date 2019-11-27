import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { getProducts, getProduct } from "./service";

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

  const createSkuList = n => {
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
    let array = [];
    for (let i = 0; i < n; i++) {
      array = [...array, ...skus];
    }
    return array;
  };

  const getAllProduct = () => {
    const listSku = createSkuList(100);
    const startTime = Date.now();
    getProducts(listSku).then(response => {
      if (response) {
        const endTime = Date.now();
        alert(endTime - startTime);
      }
    });
  };

  const createSkuBatchs = () => {
    const skuBatchs = [];
    const skuList = createSkuList(100);
    for (let i = 0; i < skuList.length; i += 10) {
      let skus = skuList.slice(i, i + 10);
      skuBatchs.push(skus);
    }
    return skuBatchs;
  };

  const getProductsByBatch = () => {
    let promises = [];
    const skuBatchs = createSkuBatchs();
    skuBatchs.map(skus => promises.push(getProducts(skus)));

    const startTime = Date.now();
    Promise.all(promises.map(p => p.catch(e => e))).then(res => {
      const endTime = Date.now();
      return alert(endTime - startTime);
    });
  };

  const getProductOneByOne = async () => {
    const skuBatchs = createSkuBatchs();
    const startTime = Date.now();
    for (let i = 0; i < skuBatchs.length; i++) {
      await getProducts(skuBatchs[i]);
    }
    const endTime = Date.now();
    return alert(endTime - startTime);
  };

  // initial code
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
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
        </a> */}
        <div>
          <button type="button" onClick={getAllProduct}>
            call 1 api
          </button>
          <button type="button" onClick={getProductOneByOne}>
            get product one by one
          </button>
          <button type="button" onClick={getProductsByBatch}>
            get products by batch
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
