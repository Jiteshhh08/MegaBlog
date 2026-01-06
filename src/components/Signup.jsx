import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";

function SignUP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const SignUp = async (data) => {
    setError("");
    try {
      let userData = await authService.CreateAccount({email: data.email,password: data.password,name: data.name});
      if (userData) {
        userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-25">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(SignUp)}>
            <div className="space-y-5">
              <Input
                lable="Name"
                placeholder="Enter your full name"
                type="text"
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                lable="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                        value
                      ) || "Enter a valid email address",
                  },
                })}
              />
              <Input
                lable="Password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUP;
