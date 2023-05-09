import axios from "./customize-axios";

function fetchUserAccount(page) {
  return axios.get(`/users?page=${page}`);
}

export { fetchUserAccount };
