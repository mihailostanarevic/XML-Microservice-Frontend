export let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

export function parseJSON(response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response);
}

export function updateHeaders(newHeaders) {
    headers = { ...headers, newHeaders };
    Object.keys(headers).forEach((key) => {
        if (undefined === headers[key]) {
            delete headers[key];
        }
    });
}

export const BASE_URL = 'http://127.0.0.1:8000/api/';