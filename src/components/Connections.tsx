/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';

const Connections = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const connections = useSelector((store: any) => store.connections)

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
      dispatch(addConnections(res.data.data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getConnections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!connections) return <></>;

  if (connections.length === 0) return <h1 className='text-bold text-2xl'>No Connections found</h1>;

  return (
    <div className='text-center my-10'><h1 className='text-bold text-3xl text-white'>Connections</h1>
      {connections.map((connection: any) => {
        const { photoUrl, firstName, lastName, age, gender, about } = connection
        return (
          <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
            <div>
              <img src={photoUrl} alt="photo" className='w-20 h-20 rounded-full' />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold'>{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections