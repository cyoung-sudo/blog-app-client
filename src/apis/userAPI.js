import api from "./configs/axiosConfig";

//----- Retrieve all users
export const getAll = async () => {
  const res = await api.request({
    method: "GET",
    url: "/user"
  });

  return res;
};

//----- Create user
export const create = async (username, password) => {
  const res = await api.request({
    method: "POST",
    data: {
      username,
      password
    },
    url: "/user"
  });

  return res;
};

//----- Retrieve given user
export const getUser = async id => {
  const res = await api.request({
    method: "GET",
    url: `/user/${id}`
  });

  return res;
};