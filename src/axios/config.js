import axios from "axios";
const urlLocal ="http://localhost:8080"

const blogFetch = axios.create({
    baseURL: urlLocal ,
    headers:{"Content-Type": "application/json"}
});
export default blogFetch;
