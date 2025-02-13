import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = (): React.JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((store: any) => store.user)
  return (
    user && <div><EditProfile user={user} /></div>
  )
}

export default Profile