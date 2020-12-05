import axios from "axios";
import decodeToken from "../helper/decodeToken"
import jwt_decode from "jwt-decode";
 
function login(email, password) {
  const userConfig = {
    email: email,
    password: password,
  };
  return new Promise((resolve, reject) => {
    axios
      .post("https://managewarehouse.herokuapp.com/auth", userConfig)
      .then((res) => {
        console.log(res)
        let permission = jwt_decode(JSON.stringify(res.data.token));
        console.log(permission)
        if (permission.permissionIds[0].permission !== "ADMIN") {
          throw new Error("Account is not permited");
        }
 
        localStorage.setItem("token", JSON.stringify(res.data.token));
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
export default {
  login,
};
 

