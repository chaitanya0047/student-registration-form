import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const StudentRegistrationForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const GENDER_OPTIONS = ["Male", "Female", "Other"];

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    toast.success("Form Submitted Successfully ✅");
    reset();
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Toaster position="top-center" />
      <section className="w-full max-w-2xl flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Student Registration Form
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              Full Name
              <div className="text-red-600">*</div>
            </label>
            <input
              id="fullName"
              type="text"
              className="rounded-lg border px-3 py-2 outline-none"
              {...register("fullName", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "No numbers or special characters allowed",
                },
              })}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="age"
              className="text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              Age <div className="text-red-600">*</div>
            </label>
            <input
              id="age"
              type="number"
              className="rounded-lg border px-3 py-2 outline-none"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Minimum age is 18" },
                max: { value: 60, message: "Maximum age is 60" },
              })}
            />
            {errors.age && (
              <p className="text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              Email Address <div className="text-red-600">*</div>
            </label>
            <input
              id="email"
              type="email"
              className="rounded-lg border px-3 py-2 outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              Password <div className="text-red-600">*</div>
            </label>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full outline-none bg-transparent"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                    message:
                      "Must include uppercase letter, number, and special character",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-gray-700 flex items-center gap-1">
              Gender <div className="text-red-600">*</div>
            </legend>
            <div className="flex gap-6">
              {GENDER_OPTIONS.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 text-gray-800"
                >
                  <input
                    type="radio"
                    value={option}
                    {...register("gender", { required: "Gender is required" })}
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-sm text-red-600">{errors.gender.message}</p>
            )}
          </fieldset>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="department"
              className="text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              Department <div className="text-red-600">*</div>
            </label>
            <select
              id="department"
              defaultValue=""
              className="rounded-lg border bg-white px-3 py-2 outline-none"
              {...register("department", {
                validate: (v) => v !== "" || "Select a department",
              })}
            >
              <option value="">Select…</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
            {errors.department && (
              <p className="text-sm text-red-600">
                {errors.department.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "Must accept terms & conditions",
                })}
              />
              I agree to the Terms & Conditions
            </label>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 active:scale-95"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default StudentRegistrationForm;
