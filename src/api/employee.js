import axios from "axios";
import { baseUrl } from "../config/api-config";
import { buildQuery } from "../config/api-config";

export const getEmployees = (query, token) => {
    let qs = buildQuery(query);
    let url = `${baseUrl}/employees${qs}`;
    return axios.get(url, {
        headers: {
            authorization: token
        }
    })
}