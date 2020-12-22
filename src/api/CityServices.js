import axios from "axios";

function getCity() {
  const token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .get("https://managewarehouse.herokuapp.com/cities?page=1&limit=1000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res)
        const data = [];
        data.push(res.data.data.histories);
        resolve(data);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export default {
    getCity,
}