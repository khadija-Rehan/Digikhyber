import invoke from "../utils/invoke";

export const generatePdf = async (amount) => {
  const data = await invoke({
    url: `/users/generate-pdf`,
    method: "POST",
    data: {amount},
  });
  return data;
};
