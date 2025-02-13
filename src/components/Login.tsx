import React, { ChangeEvent, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState<string>('user5@gmail.com');
  const [password, setPassword] = useState<string>('User@123');
  const [error, setError] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
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

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
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
              <input type="text" className="input input-bordered w-full max-w-xs" value={password} onChange={(e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)} />
            </label>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login