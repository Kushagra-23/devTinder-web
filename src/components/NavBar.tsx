import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'

const NavBar = (): React.JSX.Element => {
  const user = useSelector((store: any) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, {
        withCredentials: true
      })
      dispatch(removeUser())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to='/feed' className="btn btn-ghost text-xl"><img
          alt="DevTinder-Logo"
          src="/public/DevTinderLogo.svg"
          className="h-10 w-auto"
        />DevTinder</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex flex-row items-center">
          <li><Link to='/connections' className="text-lg tracking-tight justify-between">
            Connections
          </Link></li>
          <li><Link to='/requests' className="text-lg tracking-tight justify-between">
            Requests
          </Link></li>
          <li>
            <Link to='/profile' className="text-lg tracking-tight justify-between">
              Profile
            </Link>
          </li>
          {user && <div className="flex flex-row items-center gap-2 ml-5">
            <div className="form-control text-lg tracking-tight">Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end mx-5 flex">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full">
                  <img
                    alt="User photo"
                    src={user.photoUrl ? user.photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>}
        </ul>
      </div>
    </div>
  )
}

export default NavBar