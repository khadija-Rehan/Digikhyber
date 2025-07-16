import invoke from "../utils/invoke";

const apikey = process.env.REACT_APP_API_KEY;

export const signUp = async (signupdata) => {
  const data = await invoke({
    url: `/auth/signup`,
    method: "POST",
    headers: { 'Content-Type': 'multipart/form-data' },
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

export const forgotPasswordRequest = async (emailData) => {
  const data = await invoke({
    url: `/auth/forgot-password`,
    method: "POST",
    data: emailData,
  });
  return data;
};

export const resetPassword = async (resetData, token) => {
  const data = await invoke({
    url: `/auth/reset-password/${token}`,
    method: "PUT",
    data: resetData,
  });
  return data;
};
