import config from "../config.js";

const apiKey = config.apiKey;

export const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;


