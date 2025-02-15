/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserCard = ({ user }: any): React.JSX.Element => {
  const { photoUrl, firstName, lastName, age, gender, about, _id } = user
  const dispatch = useDispatch();

  const handleSendRequest = async (status: string, userId: any) => {
    try {
      const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + userId, {}, { withCredentials: true })
      dispatch(removeFeed(userId))
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="user-photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest('ignored', _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest('interested', _id)}>Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard