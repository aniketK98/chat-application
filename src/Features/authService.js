import httpMethods from "../axios";

//createUser
const registerUser = async (userData) => {
  const res = await httpMethods.createUser(userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

//loginUser
const loginUser = async (userData) => {
  const res = await httpMethods.loginUser(userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

//logout
const logout = async () => {
  return await localStorage.removeItem("user");
};

const authService = {
  registerUser,
  loginUser,
  logout,
};

export default authService;
