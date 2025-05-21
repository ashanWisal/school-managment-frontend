import axios from "axios"

const BASE_URL = 'http://localhost:3000'

export const getAllTeachers = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/teacher`)
        return response.data
    } catch (error:any) {
        throw error.response?.data?.message || 'Something went wrong'
    }
}

export const deleteTeacherApi = async (id: string) =>{
    try {
        const response = await axios.delete(`${BASE_URL}/teacher/${id}`)
        return response.data 
        
    } catch (error:any) {
        throw error.response?.data?.message || 'Something went wrong'
    }
}