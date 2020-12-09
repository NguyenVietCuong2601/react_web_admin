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
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export default {
    getWarehouse,
    getDetailWarehouse
};
