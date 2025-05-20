import axios from "axios"
import type { SignUpDto} from "./dtos/user.dto"

const BASE_URL = 'http://localhost:3000'


export const SignUpApi = async (signupData: SignUpDto) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, signupData);
      return response.data;
    } catch (error: any) {
      console.error('API error details:', error.response?.data);
      throw error.response?.data?.message || 'Something went wrong';
    }
  }

// export const CreateStudentApi = async (studentData: StudentDto) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/student`, studentData)

//         return response.data


//     } catch (error: any) {
//         throw error.response?.data?.message || 'Something went wrong'
//     }
// }

// export const CreateTeacherApi = async (teacherData: TeacherDto) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/teacher`, teacherData)

//         return response.data


//     } catch (error: any) {
//         throw error.response?.data?.message || 'Something went wrong'
//     }
// }