import api from "./configs/axiosConfig";

//----- Login user
export const login = async (username, password) => {
  const res = await api.request({
    method: "POST",
    data: {
      username,
      password
    },
    url: "/auth/login"
  });

  return res;
};