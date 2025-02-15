import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const feed = useSelector((store: any) => store.feed)
  const getFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
      dispatch(addFeed(res.data.users))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!feed) return <></>;

  if (feed.length <= 0) return <h1 className='flex justify-center text-bold text-2xl'>No users found</h1>;

  return (
    feed && <div className='flex justify-center my-10'><UserCard user={feed[0]} /></div>
  )
}

export default Feed