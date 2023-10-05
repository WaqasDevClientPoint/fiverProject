import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your API's base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signUpUser = async (signUpData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};


export const loginUser = async (email, password) => {
    console.log(email, password);

    try {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.status === 403) {
            throw new Error('Email/Password is incorrect!'); // Customize this error message as needed
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};



export const logoutUser = async (token) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/api/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRequest = async (token, url) => {
    try {
        const response = await axiosInstance.get(API_BASE_URL+url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const get = async (url) => {
    try {
        const response = await axiosInstance.get(API_BASE_URL+url);
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const postRequest = async (token, url, data) => {
    try {
        const response = await axiosInstance.post(API_BASE_URL+url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const post = async (url, data) => {
    try {
        const response = await axiosInstance.post(API_BASE_URL + url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const putRequest = async (token, url, data) => {
    try {
        const response = await axiosInstance.put(API_BASE_URL+url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};