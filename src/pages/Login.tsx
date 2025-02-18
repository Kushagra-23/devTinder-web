import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

export const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!emailId || !password) {
      setError("Invalid credentials");
    } else {
      setError("");
      try {
        const response = await axios.post(
          BASE_URL + "/login",
          {
            emailId,
            password,
          },
          { withCredentials: true }
        );
        dispatch(addUser(response?.data?.data));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/feed");
        }, 500);
      } catch (error: any) {
        setError(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="DevTinder-Logo"
          src="/public/DevTinderLogo.svg"
          className="mx-auto h-20 w-auto"
        />
        <h3 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          DevTinder
        </h3>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="off"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={emailId}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                setEmailId(e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="off"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                setPassword(e.target.value)
              }
            />
          </div>
        </div>

        {!!error && (
          <div>
            <p className="mt-2 font-bold text-center text-sm/6 text-red-500">
              {error}
            </p>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-primary"
          >
            Sign Up Here
          </Link>
        </p>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Login successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};
