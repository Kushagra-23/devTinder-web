import React, { ChangeEvent, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

  const handleLogin = async (): Promise<void> => {
    setError('')
    try {
      const response = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, { withCredentials: true })
      dispatch(addUser(response.data))
      navigate('/feed')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.response?.data)
      console.error(error)
    }
  }

  const handleSignup = async (): Promise<void> => {
    setError('')
    try {
      const response = await axios.post(BASE_URL + "/signup", {
        emailId,
        password,
        firstName,
        lastName
      }, { withCredentials: true })
      dispatch(addUser(response.data.data))
      navigate('/profile')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.response?.data)
      console.error(error)
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div>
            {!isLoginForm && <>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input type="text" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e: ChangeEvent<HTMLInputElement>): void => setFirstName(e.target.value)} />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input type="text" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e: ChangeEvent<HTMLInputElement>): void => setLastName(e.target.value)} />
              </label>
            </>}

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input type="text" className="input input-bordered w-full max-w-xs" value={emailId} onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmailId(e.target.value)} />
            </label>
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="password" className="input input-bordered w-full max-w-xs" value={password} onChange={(e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)} />
            </label>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p className='m-auto cursor-pointer py-2' onClick={(): void => setIsLoginForm(!isLoginForm)} >{isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login