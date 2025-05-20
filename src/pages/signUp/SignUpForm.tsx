
import { useFormik } from 'formik';
import { signupValidation } from './SignUpvalidation';
import { toast } from 'react-toastify';
// import {  CreateUserApi } from '../../api/signupApi/SignUpApi';
// import type { StudentDto, TeacherDto, UserDto } from '../../api/signupApi/dtos/user.dto';
import { useEffect } from 'react';
import { SignUpApi } from '../../api/signupApi/SignUpApi';
import type { SignUpDto } from '../../api/signupApi/dtos/user.dto';

const SignUpForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'student',
            age: '',
            gender: '',
            className: '',
            subject: '',
        },
        validationSchema: signupValidation,
        onSubmit: async (values, { resetForm }) => {
           
           try {
            const payload: SignUpDto ={
                name: values.name,
                email: values.email,
                password: values.password,
                role: values.role as 'student' | 'teacher',
                ...(values.role ==='student' && {
                    age: Number(values.age),
                    gender: values.gender,
                    className: values.className
                }),
                ...(values.role ==='teacher' && {
                    subject: values.subject
                })
               } 
               const response = await SignUpApi(payload);
               if(response){
                toast.success('User created successfully');
                resetForm();
               }
           } catch (error: any) {
            throw error.response?.data?.message || 'Something went wrong';
           }


        },
    });

    useEffect(() => {
        console.log('Form values:', formik.values);
        console.log('Form errors:', formik.errors);
    }, [formik.values, formik.errors]);

    const { values, handleChange, handleSubmit, touched, errors } = formik;

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
            <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

            <div>
                <label className="block mb-1">Name</label>
                <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                {touched.name && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
                <label className="block mb-1">Email</label>
                <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
                <label className="block mb-1">Password</label>
                <input
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                {touched.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
                <label className="block mb-1">Role</label>
                <select
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            </div>

            {values.role === 'student' && (
                <>
                    <div>
                        <label className="block mb-1">Age</label>
                        <input
                            name="age"
                            type="number"
                            value={values.age}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {touched.age && errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Gender</label>
                        <input
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {touched.gender && errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Class</label>
                        <input
                            name="className"
                            value={values.className}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        {touched.className && errors.className && <p className="text-red-500 text-sm">{errors.className}</p>}
                    </div>
                </>
            )}

            {values.role === 'teacher' && (
                <div>
                    <label className="block mb-1">Subject</label>
                    <input
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {touched.subject && errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
                Sign Up
            </button>
            
        </form>
    );
};

export default SignUpForm;
