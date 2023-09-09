import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useContextState } from '../context/context'
import PaymentType from './PaymentType'

function Checkout() {
    const [itemAmount, setItemAmount] = useState(4)
    const { paymentType, setPaymentType, setShowCheckout } = useContextState()


  return (
    <div className='absolute lg:relative top-[-90px] w-[400px] md:w-[400px] bg-white h-[500px] p-4'>
          {paymentType?
            <PaymentType />
            :
            <div>
                  <div className='w-fit absolute top-10 left-6 cursor-pointer hover:bg-gray-200 p-2 rounded-full text-black' onClick={() => setShowCheckout(false)}>
                      <FaArrowLeft />
                  </div>
                  <div className='pt-10'>
                    <h2>{itemAmount}sol</h2>
            
                    <button className='mt-4 p-2 bg-blue-400 font-bold text-gray-200' onClick={() => setPaymentType(true)}>Complete payment</button>
                  </div>
            </div>
          }
    </div>
  )
}

export default Checkout