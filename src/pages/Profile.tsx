import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from '../components/UserCard'

export const Profile = (): React.JSX.Element => {
  const user = useSelector((store: any) => store.user)
  return (
    user && <UserCard user={user} isEdit={true} />
  )
}