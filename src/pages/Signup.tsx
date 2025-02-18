import React, { ChangeEvent, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleSignup = async (): Promise<void> => {
    if (!emailId || !password || !firstName || !lastName) {
      setError("All fields are mandatory");
    } else {
      setError('')
      try {
        const response = await axios.post(BASE_URL + "/signup", {
          emailId,
          password,
          firstName,
          lastName
        }, { withCredentials: true })
        dispatch(addUser(response?.data?.data))
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate('/profile')
        }, 500);
      } catch (error: any) {
        setError(error?.response?.data?.message)
      }
    }
  }

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
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm/6 font-medium text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="off"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                setFirstName(e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Last Name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="off"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                setLastName(e.target.value)
              }
            />
          </div>
        </div>
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
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary"
          >
            Login Here
          </Link>
        </p>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>User created successfully</span>
          </div>
        </div>
      )}
    </div>
  )
}
