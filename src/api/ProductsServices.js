import axios from "axios";

function getProducts() {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .get("https://managewarehouse.herokuapp.com/products?page=1&limit=1000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res)
        const data = [];
        data.push(res.data.data.products);
        console.log(data);
        resolve(data);

      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getDetailProducts(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .get(`https://managewarehouse.herokuapp.com/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id: id },
      })
      .then((res) => {
        const data = [];
        data.push(res);
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function updateProduct(id, updatedProduct) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .patch(`https://managewarehouse.herokuapp.com/products/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { idUser: id },
      })
      .then((res) => {
        resolve(res);
        console.log(res)
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
}
// function createUser(createdUser) {
//   return new Promise((resolve, reject) => {
//     axios
//       .post("http://14.245.65.138:9090/api/auth/v1/user/register", createdUser)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((error) => {
//         console.log(error);
//         reject(error);
//       });
//   });
// }
// function updateUser(id, updatedUser) {
//   const token = JSON.parse(localStorage.getItem("token"));
//   return new Promise((resolve, reject) => {
//     axios
//       .put(`http://14.245.65.138:9090/api/edu/v1/user/update`, updatedUser, {
//         params: { idUser: id },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((error) => {
//         reject(error);
//         console.log(error);
//       });
//   });
// }
// function deleteUser(id) {
//   const token = JSON.parse(localStorage.getItem("token"));
//   return new Promise((resolve, reject) => {
//     axios
//       .delete(`http://14.245.65.138:9090/api/edu/v1/user/delete`, {
//         params: { idUser: id },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((error) => {
//         console.log(error);
//         reject(error);
//       });
//   });
// }

// function changeStatus(id, status) {
//   const token = JSON.parse(localStorage.getItem("token"));
//   return new Promise((resolve, reject) => {
//     axios
//       .put(
//         "http://14.245.65.138:9090/api/edu/v1/user/changestatus",
//         { name_status: status },
//         {
//           params: { id: id },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((error) => {
//         console.log(error);
//         reject(error);
//       });
//   });
// }
export default {
//   getUsers,
//   getDetailUser,
//   createUser,
//   updateUser,
//   deleteUser,
//   changeStatus,
    getProducts,
    getDetailProducts,
    updateProduct
};
