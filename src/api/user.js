import invoke from "../utils/invoke";

export const generatePdf = async (amount, userCourses) => {
  const data = await invoke({
    url: `/users/generate-pdf`,
    method: "POST",
    data: {amount, userCourses},
  });
  return data;
};
export const applyForScholarship = async (formData) => {
  const data = await invoke({
    url: `/scholarship/apply`,
    method: "POST",
    data: formData,
  });
  return data;
};

export const submitTestResults = async (testData) => {
  const data = await invoke({
    url: `/users/test`,
    method: "POST",
    data: testData,
  });
  return data;
};

export const getUserProfile = async () => {
  const data = await invoke({
    url: `/users/profile`,
    method: "GET",
  });
  return data;
};

export const submitContactForm = async (contactData) => {
  const data = await invoke({
    url: `/contact/contact`,
    method: "POST",
    headers: { "x-api-key": "12345678" },
    data: contactData,
  });
  return data;
};
