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
    <div className="flex bg-gradient-to-t from-yellow-600">
      <div className="w-[50%]">
        <div className="h-screen hidden lg:block">
          <img
            src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="w-[40%] flex justify-center items-center">
        <div className="w-[70%] mx-auto mr-4">
          <h2 className="text-xl font-bold mb-4 text-center opacity-65">Login</h2>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-700 font-bold text-sm">{formik.errors.email}</p>
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
                className={`w-full p-2 border rounded ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : ""
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
                className={`w-full p-2 border rounded ${
                  formik.touched.password && formik.errors.password ? "border-red-500" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-700 text-sm font-bold">{formik.errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-t from-yellow-800 text-white p-2 rounded hover:bg-yellow-600 transition"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
            <Link to={"/register"}>
              <h1 className="underline text-white font-thin p-2">Register..</h1>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
