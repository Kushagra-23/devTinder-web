import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import { LoadingComponent } from '../components/LoadingComponent';
import { Link } from 'react-router-dom';

export const Connections = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const connections = useSelector((store: any) => store.connections);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getConnections = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
      dispatch(addConnections(res.data.data))
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getConnections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <LoadingComponent />
  }

  if (!connections) return <h1 className='flex justify-center text-bold text-5xl font-medium mt-80'>Oh no! Unable to fetch connections.</h1>;

  if (connections.length === 0) return <h1 className='flex justify-center text-bold text-5xl font-medium mt-80'>No Connections found</h1>;

  return (
    <div className='text-center my-10'><h1 className='text-bold text-3xl'>Connections</h1>
      {connections.map((connection: any) => {
        const { photoUrl, firstName, lastName, age, gender, about, _id } = connection
        return (
          <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
            <div>
              <img src={photoUrl ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="photo" className='w-20 h-20 rounded-full' />
            </div>
            <div className='text-left mx-4 w-4/5'>
              <h2 className='card-title text-xl font-medium'>{firstName + " " + lastName}</h2>
              {age && gender && <p text-base font-medium>{age + ", " + gender}</p>}
              <p className='break-words'>{about}</p>
            </div>
            <Link to={"/chat/" + _id}><button className='btn btn-primary'>Chat</button></Link>
          </div>
        )
      })}
    </div>
  )
}