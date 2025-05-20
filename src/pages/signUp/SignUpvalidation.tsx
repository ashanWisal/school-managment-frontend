// src/pages/signUp/signupValidation.ts
import * as Yup from 'yup';

export const signupValidation = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),

  role: Yup.string().oneOf(['student', 'teacher']).required(),


  age: Yup.number()
    .when('role', {
      is: 'student',
      then: (schema) => schema.required('Age is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  gender: Yup.string()
    .when('role', {
      is: 'student',
      then: (schema) => schema.required('Gender is required'),
    }),
  className: Yup.string()
    .when('role', {
      is: 'student',
      then: (schema) => schema.required('Class is required'),
    }),


  subject: Yup.string()
    .when('role', {
      is: 'teacher',
      then: (schema) => schema.required('Subject is required'),
    }),
});
