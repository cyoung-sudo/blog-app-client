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

//----- Delete given post
export const deletePost = async id => {
  const res = await api.request({
    method: "DELETE",
    url: `/post/${id}`
  });

  return res;
};

//----- Retrieve all posts for given user
export const getForUser = async userId => {
  const res = await api.request({
    method: "GET",
    url: `/post/user/${userId}`
  });

  return res;
};

//----- Delete all posts for given user
export const deleteForUser = async userId => {
  const res = await api.request({
    method: "DELETE",
    url: `/post/user/${userId}`
  });

  return res;
};