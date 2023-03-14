import api from "./configs/axiosConfig";

//----- Create user
export const create = async (username, password) => {
  const res = await api.request({
    method: "POST",
    data: {
      username,
      password
    },
    url: "/users"
  });

  return res;
};