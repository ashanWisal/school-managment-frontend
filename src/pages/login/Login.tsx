import { useFormik } from 'formik';
import { LoginValidation } from './LoginValidation';
import { LoginApi } from '../../api/login/longin.dto.ts/LoginApi';
import { useNavigate } from 'react-router-dom';
import { ROUTE_TEACHER } from '../../routes/constants';

const Login = ({ setUser }: { setUser: any }) => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidation,
    onSubmit: async (values, { resetForm, setSubmitting, setStatus }) => {
      try {
        const loginResponse = await LoginApi(values);
        console.log("Login response:", loginResponse); 
        
        if (loginResponse) {
          
          const userData = loginResponse.user ? loginResponse.user : loginResponse;
          
          console.log("Extracted user data:", userData); 
          
          
          if (!userData.role) {
            console.error("User data missing role property:", userData);
            setStatus("Invalid login response. Please try again.");
            return;
          }
          
          
          localStorage.setItem('user', JSON.stringify(userData));
          
          
          setUser(userData);
          
          console.log("User role:", userData.role); 
         
          resetForm();
          
          
          if (userData.role === 'admin') {
            console.log("Admin login detected, navigating to:", ROUTE_TEACHER);
            navigate(ROUTE_TEACHER);
          } else {
            console.log("Non-admin login detected, navigating to home");
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        setStatus("Login failed. Please check your credentials and try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {formik.status && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{formik.status}</div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;