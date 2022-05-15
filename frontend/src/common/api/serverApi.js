import axios from "axios";

// const baseUrl = "https://k6a404.p.ssafy.io/api/v1";

export default axios.create({
  baseURL: "http://localhost:8080/api/v1",
});
