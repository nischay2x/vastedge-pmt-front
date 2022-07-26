export const baseUrl = 'http://localhost:5000';

export function buildQuery (query) {
    let queries = Object.keys(query).map(k => `${k}=${query[k]}`)
    return `?${queries.join('&')}`
}