import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmUwMTEzYTQ1ODViZWJiZDFkNTczYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjYxMDczNiwiZXhwIjoxNjQyODY5OTM2fQ.W_Tv-d600bdpmwwmbI0w2xyq2dQTLynDf4sP2y59l5g";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
});