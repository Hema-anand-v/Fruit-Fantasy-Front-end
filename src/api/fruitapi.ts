import axios from "axios";
import type { Fruit } from "../types/Fruit";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export const fruitApi = {
  getAll: () => api.get("/fruits"),
  getById: (id: number) => api.get(`/fruits/${id}`),
  create: (fruit: Fruit) => api.post("/fruits", fruit),
  update: (id: number, fruit: Fruit) => api.put(`/fruits/${id}`, fruit),
  delete: (id: number) => api.delete(`/fruits/${id}`),
};