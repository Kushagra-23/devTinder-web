import React, { ChangeEvent, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditProfile = ({ user }: any): React.JSX.Element => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [age, setAge] = useState<string>(user.age);
  const [gender, setGender] = useState<string>(user.gender);
  const [about, setAbout] = useState<string>(user.about);
  const [photoUrl, setPhotoUrl] = useState<string>(user.photoUrl);
  const [error, setError] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const dispatch = useDispatch()

  const saveProfile = async () => {
    setError('')
    try {
      const res = await axios.patch(BASE_URL + '/profile/edit', {
        photoUrl, firstName, lastName, age, gender, about
      }, {
        withCredentials: true
      })
      dispatch(addUser(res.data.data))
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.response?.data)
      console.error(error)
    }
  }

  return (
    <>
      <div className='flex justify-center my-10'>
        <div className='flex justify-center mx-10'>
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e: ChangeEvent<HTMLInputElement>): void => setFirstName(e.target.value)} />
                </label>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e: ChangeEvent<HTMLInputElement>): void => setLastName(e.target.value)} />
                </label>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={photoUrl} onChange={(e: ChangeEvent<HTMLInputElement>): void => setPhotoUrl(e.target.value)} />
                </label>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={age} onChange={(e: ChangeEvent<HTMLInputElement>): void => setAge(e.target.value)} />
                </label>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={gender} onChange={(e: ChangeEvent<HTMLInputElement>): void => setGender(e.target.value)} />
                </label>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={about} onChange={(e: ChangeEvent<HTMLInputElement>): void => setAbout(e.target.value)} />
                </label>
              </div>
              <p className='text-red-500'>{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>Save</button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ photoUrl, firstName, lastName, age, gender, about }} />
      </div>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile updated successfully</span>
        </div>
      </div>}
    </>
  )
}

export default EditProfile