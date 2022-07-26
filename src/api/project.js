import axios from "axios";
import { baseUrl } from "../config/api-config";
import { buildQuery } from "../config/api-config";

export const getProjects = (query, token) => {
    let qs = buildQuery(query);
    let url = `${baseUrl}/projects${qs}`;
    return axios.get(url, {
        headers: {
            authorization: token
        }
    })
}

export const createProject = (data, token) => axios.post(`${baseUrl}/project`, data, {
    headers: {
        authorization: token
    }
})

export const deleteProject = (id, token) => axios.delete(`${baseUrl}/project/${id}`, {
    headers: {
        authorization: token
    }
})

export const updateProject = (id, data, token) => axios.patch(`${baseUrl}/project/${id}`, data, {
    headers: {
        authorization: token
    }
})

export const getProjectsByUserId = (id, query, token) => {
    let qs = buildQuery(query);
    let url = `${baseUrl}/projects/user/${id}${qs}`;
    return axios.get(url, {
        headers: {
            authorization: token
        }
    })
}