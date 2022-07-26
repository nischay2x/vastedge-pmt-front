import axios from "axios";
import { baseUrl } from "../config/api-config";

const base = `${baseUrl}/auth`;

export function fetchTokenUser (token) {
    return axios.get(base+"/user", {
        headers: {
            'Authorization': token
        }
    })
}

export function emailLogin (email, password) {
    return axios.post(base+'/login', { email, password })
}