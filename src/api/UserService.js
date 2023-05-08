import axios from "./customize-axios";

function fetchUserAccount() {
  return axios.get("/users?page=1");
}

export { fetchUserAccount };
