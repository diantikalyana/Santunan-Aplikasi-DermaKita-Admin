// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.100.129:8000/api", // atau baseURL API kamu
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
