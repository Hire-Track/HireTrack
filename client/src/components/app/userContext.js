import { getUser } from "../apis/users";

export const userContext = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const data = await getUser();
    if (data) {
      return data.userName;
    }
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("token");
};
