import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequests, removeRequests } from '../utils/requestSlice';
import { LoadingComponent } from '../components/LoadingComponent';

export const Requests = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const requests = useSelector((store: any) => store.requests)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reviewRequest = async (status: string, id: string) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + id, {}, { withCredentials: true })
      dispatch(removeRequests(id))
    } catch (error) {
      console.error(error)
    }
  }

  const getRequests = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
      dispatch(addRequests(res.data.connectionRequests))
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <LoadingComponent />
  }

  if (!requests) return <h1 className='flex justify-center text-bold text-5xl font-medium mt-80'>Oh no! Unable to fetch requests.</h1>;

  if (requests.length === 0) return <h1 className='flex justify-center text-bold text-5xl font-medium mt-80'>No requests found</h1>;

  return (
    <div className='text-center my-10'><h1 className='text-bold text-3xl'>Requests</h1>
      {requests.map((request: any) => {
        const { photoUrl, firstName, lastName, age, gender, about } = request.fromUserId
        return (
          <div className='flex m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto justify-between items-center'>
            <div className='flex'>
              <img src={photoUrl ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="photo" className='w-20 h-20 rounded-full' />
              <div className='text-left mx-4 w-96'>
                <h2 className='card-title text-xl font-medium'>{firstName + " " + lastName}</h2>
                {age && gender && <p className='text-base font-medium'>{age + ", " + gender}</p>}
                <p className='break-words'>{about}</p>
              </div>
            </div>
            <div>
              <button className="btn btn-primary text-base-100 mx-2" onClick={() => reviewRequest('rejected', request._id)}>Reject</button>
              <button className="btn btn-secondary text-base-100 mx-2" onClick={() => reviewRequest('accepted', request._id)}>Accept</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}