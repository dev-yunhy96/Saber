import axios from "axios";

// const baseURL = "http://localhost:8080/api/v1";
const baseURL = "https://k6a404.p.ssafy.io/api/v1";
export default axios.create({
  baseURL: baseURL,
});
