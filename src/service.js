export function getProducts(skus) {
  const requestOptions = {
    method: "GET"
  };
  return fetch(
    `https://listing-dev.services.teko.vn/api/search/?channel=pv_online&terminal=phongvu&skus=${skus.join()}`,
    requestOptions
  ).then(
    response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    },
    error => Promise.reject(error)
  );
}

export function getProduct(sku) {
  const requestOptions = {
    method: "GET"
  };
  return fetch(
    `https://listing-dev.services.teko.vn/api/search/?channel=pv_online&terminal=phongvu&skus=${sku}`,
    requestOptions
  ).then(
    response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    },
    error => Promise.reject(error)
  );
}
