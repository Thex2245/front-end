import axios from 'axios';

const app = axios.create({ baseURL: "https://dashboard.discloud.app/api" })

export { app }