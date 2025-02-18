import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from '../components/UserCard'
import { LoadingComponent } from '../components/LoadingComponent'

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const feed = useSelector((store: any) => store.feed)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFeed = async () => {
    if (feed) return (setIsLoading(false))
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
      dispatch(addFeed(res?.data?.users))
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <LoadingComponent />
  }

  if (!feed) return <h1 className='flex justify-center text-bold text-5xl font-medium mt-80'>Oh no! Unable to fetch users.</h1>;

  if (feed.length <= 0) return <h1 className='flex justify-center text-bold text-5xl font-medium mt-80'>Good Job! All users catched up.</h1>;

  return (
    feed && <div className='flex justify-center my-10'><UserCard user={feed[0]} /></div>
  )
}