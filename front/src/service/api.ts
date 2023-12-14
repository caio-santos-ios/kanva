import axios from "axios";

export const BASE_URL = "https://kanva-ua0k.onrender.com"

export const api = axios.create({
    baseURL: BASE_URL
})