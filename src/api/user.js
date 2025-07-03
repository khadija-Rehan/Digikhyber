import invoke from "../utils/invoke";

export const generatePdf = async (amount, userCourses) => {
  const data = await invoke({
    url: `/users/generate-pdf`,
    method: "POST",
    data: {amount, userCourses},
  });
  return data;
};
