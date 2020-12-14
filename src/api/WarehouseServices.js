import axios from "axios";

function getWarehouse() {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .get("https://managewarehouse.herokuapp.com/warehouses?page=1&limit=1000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res)
        const data = [];
        data.push(res.data.data.warehouses);
        console.log(data);
        resolve(data);

      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getDetailWarehouse(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .get(`https://managewarehouse.herokuapp.com/warehouses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id: id },
      })
      .then((res) => {
        const data = [];
        data.push(res.data.data);
        resolve(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getUserWarehouse(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .get(`https://managewarehouse.herokuapp.com/warehouses/${id}/users?page=1&limit=1000`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id: id },
      })
      .then((res) => {
        //console.log(res)
        const data = [];
        data.push(res.data.data.users);
        console.log(data);
        resolve(data);

      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getProductWarehouse(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .get(`https://managewarehouse.herokuapp.com/products/warehouse/${id}?page=1&limit=1000`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id: id },
      })
      .then((res) => {
        //console.log(res)
        const data = [];
        data.push(res.data.data);
        console.log(data);
        resolve(data);

      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getHistoryWarehouse(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .get(`https://managewarehouse.herokuapp.com/histories/warehouses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id: id },
      })
      .then((res) => {
        const data = [];
        data.push(res.data.data.histories);
        resolve(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
export default {
    getWarehouse,
    getDetailWarehouse,
    getUserWarehouse,
    getProductWarehouse,
    getHistoryWarehouse
};
