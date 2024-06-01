import { getAuth } from "./auth";

const API_URL = '/api';

const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    let data;

    
    if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        alert(data.message)
        throw new Error(data.message || data || 'Network response was not ok');
    }
    
    return data;
};

const getHeaders = () => {
    const auth = getAuth();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
    };
};

const getPublicHeaders = () => {
    return {
        'Content-Type': 'application/json',
    };
};

export const apiService = {
    get: async (url) => {
        const response = await fetch(`${API_URL}${url}`, {
            headers: url.includes('private') ? getHeaders() : getPublicHeaders(),
        });
        return handleResponse(response);
    },
    post: async (url, data) => {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: url.includes('private') ? getHeaders() : getPublicHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    put: async (url, data) => {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'PUT',
            headers: url.includes('private') ? getHeaders() : getPublicHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (url) => {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'DELETE',
            headers: url.includes('private') ? getHeaders() : getPublicHeaders(),
        });
        return handleResponse(response);
    },
};
