import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

export const Premium = (): React.JSX.Element => {

  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type: string) => {
    const order = await axios.post(BASE_URL + "/payment/create", {
      membershipType: type
    }, { withCredentials: true })

    // It should open the Razorpay Dialog Box

    const { keyId, amount, currency, notes, orderId } = order.data

    const options = {
      key: keyId,
      amount: amount,
      currency: currency,
      name: 'DevTinder',
      description: 'Connect to developers',
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
      },
      theme: {
        color: '#F37254'
      },
      handler: verifyPremiumUser
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();

  }

  return isUserPremium ? (
    <>"You're are already a premium user"</>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center"><h1 className='font-bold text-3xl'>Silver Membership</h1><ul>
          <li> - Chat with other people</li>
          <li> - 1000 connection requests per day</li>
          <li> - Blue tick</li>
          <li> - 3 months</li>
        </ul>
          <button className='btn btn-primary w-32' onClick={() => handleBuyClick("silver")}>Buy Silver</button></div>

        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center"><h1 className='font-bold text-3xl'>Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinite connection requests per day</li>
            <li> - Blue tick</li>
            <li> - 6 months</li>
          </ul>
          <button className='btn btn-primary w-32' onClick={() => handleBuyClick("gold")}>Buy Gold</button>
        </div>
      </div>
    </div>
  )
}
