import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend.hunarmandpunjab.org.pk/api';
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const applyForScholarship = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/scholarship/apply`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const checkScholarshipStatus = async (rollNumber) => {
  const response = await axios.get(`${API_BASE_URL}/scholarship/check/${rollNumber}`);
  return response.data;
}; 