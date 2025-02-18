import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'
import { UserType } from '../types/user-types'
import { addUser } from '../utils/userSlice'

interface UserCardProps {
  user: UserType;
  isEdit?: boolean;
}

const UserCard = ({ user, isEdit = false }: UserCardProps): React.JSX.Element => {
  const { photoUrl, firstName, lastName, age, gender, about, _id, designation, skills, company, experience } = user
  const dispatch = useDispatch();
  const [ageValue, setAgeValue] = useState<number>();
  const [firstNameValue, setFirstNameValue] = useState<string>();
  const [lastNameValue, setLastNameValue] = useState<string>();
  const [genderValue, setGenderValue] = useState<string>();
  const [aboutValue, setAboutValue] = useState<string>();
  const [designationValue, setDesignationValue] = useState<string>();
  const [companyValue, setCompanyValue] = useState<string>();
  const [experienceValue, setExperienceValue] = useState<number>();
  const [error, setError] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    setFirstNameValue(firstName)
    setLastNameValue(lastName)
    setAgeValue(age)
    setGenderValue(gender)
    setAboutValue(about)
    setDesignationValue(designation)
    setCompanyValue(company)
    setExperienceValue(experience)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveProfile = async () => {
    if (!firstName || !lastName) {
      setError("First Name and Last Name fields are mandatory");
    } else {
      setError('')
      try {
        const res = await axios.patch(BASE_URL + '/profile/edit', {
          photoUrl, 
          firstName: firstNameValue, 
          lastName: lastNameValue, 
          age: ageValue, 
          gender: genderValue, 
          about: aboutValue,
          designation: designationValue,
          company: companyValue,
          experience: experienceValue
        }, {
          withCredentials: true
        })
        dispatch(addUser(res.data.data))
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 1000)
      } catch (error: any) {
        setError(error?.response?.data)
        console.error(error)
      }
    }
  }

  const handleSendRequest = async (status: string, userId: string) => {
    try {
      await axios.post(BASE_URL + '/request/send/' + status + '/' + userId, {}, { withCredentials: true })
      dispatch(removeFeed(userId))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={`card lg:card-side bg-base-200 shadow-xl p-4 ${isEdit && 'm-20'}`}>
        <figure className='flex-col'>
          <img
            src={photoUrl ? photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
            alt="user-photo"
            className='w-96 h-96'
          />
          <div className="card-body">
            {isEdit ? <>
              <h2 className="card-title text-xl font-medium">First Name</h2>
              <input type="text" className="input input-bordered my-2" value={firstNameValue} onChange={(e: ChangeEvent<HTMLInputElement>): void => setFirstNameValue(e.target.value)} />
              <h2 className="card-title text-xl font-medium">Last Name</h2>
              <input type="text" className="input input-bordered my-2" value={lastNameValue} onChange={(e: ChangeEvent<HTMLInputElement>): void => setLastNameValue(e.target.value)} />
            </> : <h2 className="card-title text-xl font-medium">{firstNameValue + ", " + lastNameValue}</h2>}
            {!isEdit && ageValue && genderValue && <p className='text-base font-medium'>{ageValue + ", " + genderValue}</p>}
            {!isEdit && <div className="card-actions justify-between my-4">
              <button className="btn btn-primary text-base-100" onClick={() => handleSendRequest('ignored', _id)}>Ignore</button>
              <button className="btn btn-secondary text-base-100" onClick={() => handleSendRequest('interested', _id)}>Interested</button>
            </div>}
          </div>
        </figure>
        <div className="card-body w-96">
          {isEdit && 
          <>
            <h2 className="card-title text-xl font-medium">Age</h2>
              <input type="number" className="input input-bordered my-2" value={ageValue} onChange={(e: ChangeEvent<HTMLInputElement>): void => setAgeValue(Number(e.target.value))} />
              <h2 className="card-title text-xl font-medium">Gender</h2>
              <input type="text" className="input input-bordered my-2" value={genderValue} onChange={(e: ChangeEvent<HTMLInputElement>): void => setGenderValue(e.target.value)} />
          </>}
          <h2 className="card-title text-xl font-medium">About</h2>
          {isEdit ? <input type="text" className="input input-bordered my-2" value={aboutValue} onChange={(e: ChangeEvent<HTMLInputElement>): void => setAboutValue(e.target.value)} /> : <p className='break-words'>{aboutValue}</p>}
          <h2 className="card-title text-xl font-medium">Designation</h2>
          {isEdit ? <input type="text" className="input input-bordered my-2" value={designationValue} onChange={(e: ChangeEvent<HTMLInputElement>): void => setDesignationValue(e.target.value)} /> : <p className='break-words'>{designationValue}</p>}
          <h2 className="card-title text-xl font-medium">Current Company</h2>
          {isEdit ? <input type="text" className="input input-bordered my-2" value={companyValue} onChange={(e: ChangeEvent<HTMLInputElement>): void => setCompanyValue(e.target.value)} /> : <p className='break-words'>{companyValue}</p>}
          <h2 className="card-title text-xl font-medium">Years of Experience</h2>
          {isEdit ? <input type="text" className="input input-bordered my-2" value={experienceValue} onChange={(e: ChangeEvent<HTMLInputElement>): void => setExperienceValue(Number(e.target.value))} /> : <p className='break-words'>{experienceValue}</p>}
          {!isEdit && skills && <>
            <h2 className="card-title text-xl font-medium">Skills</h2>
            {skills?.map((skill: string) => <p className='break-words'>{skill}</p>)}
          </>}
          <div className="card-actions justify-center m-2 flex-col items-center">
            {!!error && (
              <div>
                <p className="mt-2 font-bold text-center text-sm/6 text-red-500">
                  {error}
                </p>
              </div>
            )}
            <button className="btn btn-primary w-32"
              onClick={saveProfile}
            >Save</button>
          </div>
        </div>
      </div>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile updated successfully</span>
        </div>
      </div>}
    </>
  )
}

export default UserCard