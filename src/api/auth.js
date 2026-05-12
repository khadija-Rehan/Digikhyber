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

export const submitPhysicalAdmission = async (admissionData) => {
  const data = await invoke({
    url: `/auth/admission`,
    method: "POST",
    headers: { 'Content-Type': 'multipart/form-data' },
    data: admissionData,
  });
  return data;
};

export const generateOnlineChallan = async (challanData) => {
  const data = await invoke({
    url: `/auth/generate-psid`,
    method: "POST",
    data: challanData,
  });
  return data;
};

export const generatePhysicalChallan = async (challanData) => {
  const data = await invoke({
    url: `/auth/generate-physical-challan`,
    method: "POST",
    data: challanData,
  });
  return data;
};

