import api from "./configs/axiosConfig";

//----- Create post
export const create = async (userId, text) => {
  const res = await api.request({
    method: "POST",
    data: {
      userId,
      text
    },
    url: "/post"
  });

  return res;
};

//----- Retrieve all posts for given user
export const getForUser = async userId => {
  const res = await api.request({
    method: "GET",
    url: `/post/${userId}`
  });

  return res;
};