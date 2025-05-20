// Updated DTOs to match your backend

// Base DTO for user registration
export interface SignUpDto {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher';
    // Optional fields that will be included based on role
    age?: number;
    gender?: string;
    className?: string;
    subject?: string;
  }
  
  // Used for login
  export interface LoginDto {
    email: string;
    password: string;
  }
  
  // For internal use (not needed for API calls)
  export interface UserDto {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher';
  }
  
  // These can be used for type checking in your components
  // but they're not needed for the API call
  export interface StudentFields {
    age: number;
    gender: string;
    className: string;
  }
  
  export interface TeacherFields {
    subject: string;
  }