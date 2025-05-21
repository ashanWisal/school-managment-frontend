import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const LoginApi = async (loginData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Something went wrong';
    }
}