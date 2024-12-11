import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post("http://localhost:5000/api/notes/login", values);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/allnotes");
        }
      } catch (err: any) {
        setErrors({
          email: err.response?.data?.message || "Invalid email or password",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-t from-yellow-600 min-h-screen">
      {/* Left Image Section */}
      <div className="lg:w-1/2 hidden lg:block">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-700 font-bold text-sm mb-2">{formik.errors.email}</p>
          )}

          {formik.errors.email && !formik.touched.email && (
            <p className="text-red-500 mb-4 font-bold underline">{formik.errors.email}</p>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
    formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
    formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-700 text-sm font-bold mt-2">{formik.errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-800 text-white p-2 rounded hover:bg-yellow-600 transition disabled:opacity-50"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
            <Link to={"/register"}>
              <h1 className="underline text-white font-thin text-center mt-4">Register</h1>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;