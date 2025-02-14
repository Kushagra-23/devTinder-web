/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequests, removeRequests } from '../utils/requestSlice';

const Requests = (): React.JSX.Element => {

  const dispatch = useDispatch();
  const requests = useSelector((store: any) => store.requests)

  const reviewRequest = async (status: string, id: string) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + id, {}, { withCredentials: true })
      dispatch(removeRequests(id))
    } catch (error) {
      console.error(error)
    }
  }

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
      dispatch(addRequests(res.data.connectionRequests))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!requests) return <></>;

  if (requests.length === 0) return <h1 className='flex justify-center text-bold text-2xl'>No requests found</h1>;

  return (
    <div className='text-center my-10'><h1 className='text-bold text-3xl text-white'>Requests</h1>
      {requests.map((request: any) => {
        const { photoUrl, firstName, lastName, age, gender, about } = request.fromUserId
        return (
          <div className='flex m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto justify-between items-center'>
            <div>
              <img src={photoUrl} alt="photo" className='w-20 h-20 rounded-full' />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold'>{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={() => reviewRequest('rejected', request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={() => reviewRequest('accepted', request._id)}>Accept</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests