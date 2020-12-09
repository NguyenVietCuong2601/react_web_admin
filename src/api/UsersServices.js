import axios from "axios";

function getUsers() {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
<<<<<<< HEAD
      .get("https://managewarehouse.herokuapp.com/users?page=1&limit=1000", {
=======
      .get("https://managewarehouse.herokuapp.com/users?limit=10", {
>>>>>>> origin/main
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res)
        const data = [];
        data.push(res.data.data.users);
<<<<<<< HEAD
        console.log( data);
=======
>>>>>>> origin/main
        resolve(data);

      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getDetailUser(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .get(`https://managewarehouse.herokuapp.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id: id },
      })
      .then((res) => {
        const data = [];
        data.push(res.data);
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function createUser(createdUser) {
  return new Promise((resolve, reject) => {
    axios
      .post("https://managewarehouse.herokuapp.com/users", createdUser)
      .then((res) => {
        resolve(res);
        //console.log(res)
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function updateUser(id, updatedUser) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .patch(`https://managewarehouse.herokuapp.com/users/${id}`, updatedUser, {
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
function deleteUser(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .delete(`http://14.245.65.138:9090/api/edu/v1/user/delete`, {
        params: { idUser: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function changeStatus(id, status) {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .put(
        "http://14.245.65.138:9090/api/edu/v1/user/changestatus",
        { name_status: status },
        {
          params: { id: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
export default {
  getUsers,
  getDetailUser,
  createUser,
  updateUser,
  deleteUser,
  changeStatus,
};
