import axios from "./customize-axios";

function fetchUserAccount(page) {
  return axios.get(`/users?page=${page}`);
}

function postCreateUserAccount(name, job) {
  return axios.post(`/api/users`, { name, job });
}

function updateUserAccount({ name, ...user }) {
  return axios.put(`/api/users/${user.id}`, { ...user, first_name: name });
}

function deleteUserAccount(id) {
  return axios.delete(`/api/users/${id}`);
}

export {
  fetchUserAccount,
  postCreateUserAccount,
  updateUserAccount,
  deleteUserAccount,
};
