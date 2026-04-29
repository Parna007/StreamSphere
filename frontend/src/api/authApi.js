import API from "./api";

// Get logged-in user
export const getUser = async () => {

  const res =
    await API.get("/api/auth/user");

  return res.data;
};