export function getProducts(page) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjExLCJ0eXBlIjoidXNlciIsImVtYWlsIjoieWVuLm50YkB0ZWtvLnZuIiwiaWF0IjoxNTc0ODIyNzk5LCJleHAiOjE1NzQ5MDkxOTl9.dXOBljWFVnJTsoEIJQL4RVkaPX0DdF1xv7cb_Ez9GSw`
    }
  };
  return fetch(
    `https://catalog-dev.phongvu.vn/products/?pageSize=10&page=${page}`,
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

// export function getProduct(sku) {
//   const requestOptions = {
//     method: "GET"
//   };
//   return fetch(
//     `https://listing-dev.services.teko.vn/api/search/?channel=pv_online&terminal=phongvu&skus=${sku}`,
//     requestOptions
//   ).then(
//     response => {
//       if (!response.ok) {
//         return Promise.reject(response.statusText);
//       }
//       return response.json();
//     },
//     error => Promise.reject(error)
//   );
// }
