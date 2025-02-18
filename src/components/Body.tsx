import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import NavBar from './NavBar'

const Body = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store: any) => store.user)
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true
      })
      dispatch(addUser(res?.data?.data))
    } catch (error: any) {
      if (error.status === 401) {
        navigate('/login')
      }
      console.error(error)
    }
  };

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default Body