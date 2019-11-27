import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { getProducts } from "./service";

function App() {
  // demo promise
  // const timeOutResolve = t => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(`Completed in ${t}ms`);
  //     }, t);
  //   });
  // };

  // const createArray = () => {
  //   let array = [];
  //   for (let i = 0; i < 50; i += 1) {
  //     array.push(100);
  //   }
  //   return array;
  // };

  // const callPromise = async () => {
  //   const startTime = Date.now();
  //   const array = createArray();
  //   for (let i = 0; i < array.length; i += 1) {
  //     await timeOutResolve(array[i]);
  //   }
  //   const endTime = Date.now();
  //   alert(endTime - startTime);
  // };

  // const promiseAll = async array => {
  //   for (let i = 0; i < array.length; i += 100) {
  //     const subArray = array.slice(i, i + 100);
  //     let promises = [];
  //     subArray.map(item => promises.push(timeOutResolve(item)));
  //     await Promise.all(promises).then(() => {
  //       promises = [];
  //     });
  //   }
  //   return Date.now();
  // };

  // const callPromiseAll = async () => {
  //   const startTime = Date.now();
  //   const array = createArray();
  //   const endTime = await promiseAll(array);
  //   alert(endTime - startTime);
  // };

  const numberPage = 100;
  const batch10 = 10;

  const createNumberPages = () => {
    let page = 1;
    let array = [];
    for (let i = 0; i < numberPage; i += 1) {
      array.push(page);
      page += 1;
    }
    return array;
  };

  const getProductOneByOne = async () => {
    const pages = createNumberPages(); // 100 page, from 1 to 100
    console.log("pages: ", pages);

    const startTime = Date.now();
    for (let i = 0; i < pages.length; i += 1) {
      await getProducts(pages[i]);
    }
    const endTime = Date.now();
    alert(endTime - startTime);
  };

  const getProductsByBatch = async batch => {
    const pages = createNumberPages();

    const startTime = Date.now();
    for (let i = 0; i < pages.length; i += batch) {
      const pageBatch = pages.slice(i, i + batch);
      let promises = [];
      pageBatch.map(page => promises.push(getProducts(page)));
      await Promise.all(promises.map(p => p.catch(e => e)));
    }
    const endTime = Date.now();
    return alert(endTime - startTime);
  };

  const getAllProductsOneTime = () => {
    let promises = [];
    const pages = createNumberPages();
    pages.map(page => promises.push(getProducts(page)));

    const startTime = Date.now();
    Promise.all(promises.map(p => p.catch(e => e))).then(res => {
      const endTime = Date.now();
      return alert(endTime - startTime);
    });
  };

  // const createSkuBatchs = () => {
  //   const skuBatchs = [];
  //   const skuList = createNumberPages(numberPage);
  //   for (let i = 0; i < skuList.length; i += 10) {
  //     let skus = skuList.slice(i, i + 10);
  //     skuBatchs.push(skus);
  //   }
  //   return skuBatchs;
  // };

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
          <button type="button" onClick={() => getProductOneByOne()}>
            get product one by one
          </button>
          <button type="button" onClick={() => getProductsByBatch(batch10)}>
            get products by batch 10
          </button>
          <button type="button" onClick={() => getAllProductsOneTime()}>
            get all products one time
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
