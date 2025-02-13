import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserCard = ({user}: any): React.JSX.Element => {
  const {photoUrl, firstName, lastName, age, gender, about} = user
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="user-photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender &&<p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard