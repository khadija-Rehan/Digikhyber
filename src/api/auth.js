import invoke from "../utils/invoke";

const apikey = process.env.REACT_APP_API_KEY;

export const signUp = async (signupdata) => {
  const data = await invoke({
    url: `/auth/signup`,
    method: "POST",
    data: signupdata,
  });
  return data;
};

export const logIn = async (loginData) => {
  const data = await invoke({
    url: `/auth/login`,
    method: "POST",
    data: loginData,
  });
  return data;
};
