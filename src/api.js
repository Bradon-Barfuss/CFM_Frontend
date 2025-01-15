import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/lessons";

export const getLessons = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const addLesson = async (lesson) => {
  const response = await axios.post(API_BASE, lesson);
  return response.data;
};
