import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<FormValues & { general?: string }>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      general: undefined, // Add general here explicitly
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const { username, email, password } = values;
        const response = await axios.post("http://localhost:5000/api/notes/register", {
          username,
          email,
          password,
        });

        if (response.data.msg) {
          setErrors({ general: response.data.msg }); // Set general error explicitly
        } else if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      } catch (err: any) {
        setErrors({ general: err.response?.data?.msg || "An error occurred." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-t from-yellow-600 min-h-screen">
      <div className="w-full lg:w-[50%]">
        <div className="h-64 lg:h-screen hidden lg:block">
          <img
            src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="w-full  lg:w-[50%] flex justify-center items-center px-4">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center opacity-80">Register</h2>
          {formik.errors.general && (
            <p className="text-red-500 mb-4 font-bold underline text-center">{formik.errors.general}</p>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={`w-full p-2 border rounded ${
                  formik.touched.username && formik.errors.username ? "border-red-500" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-700 font-bold text-sm mt-1">{formik.errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full p-2 border rounded ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-700 font-bold text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`w-full p-2 border rounded ${
                  formik.touched.password && formik.errors.password ? "border-red-500" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-700 font-bold text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-t from-yellow-800 text-white p-2 rounded hover:bg-yellow-600 transition"
              disabled={formik.isSubmitting}
            >
              REGISTER
            </button>
            <Link to={"/"}>
              <h1 className="underline text-white font-thin p-2 text-center">Login..</h1>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
