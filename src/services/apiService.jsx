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
        throw new Error(data.message || data || 'Network response was not ok');
    }
    
    return data;
};

const getHeaders = () => {
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjIiLCJpYXQiOjE3MTY3NjIyMTcsImV4cCI6MTcxNjc2NTgxN30.-RHqEg4EehrRA-YrH8FKuz6bwWVx-RhW8SYY_jw0mi10Rf62L18n2LZg4HCkAQUbMo5TcFzeMQMKIGgY2nNTsQ";
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const apiService = {
    get: async (url) => {
        const response = await fetch(`${API_URL}${url}`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
    post: async (url, data) => {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    put: async (url, data) => {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (url) => {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
};