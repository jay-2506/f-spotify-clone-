import axios from "axios";

const API = axios.create({
  baseURL: "https://spotify-clone-6qrx.onrender.com",
  withCredentials: true, // for cookie JWT
});

export default API;
