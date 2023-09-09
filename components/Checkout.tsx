import React, { useState } from 'react'
import { useContextState } from '../context/context'
import PaymentType from './PaymentType'

function Checkout() {
    const [itemAmount, setItemAmount] = useState(4)
    const { paymentType, setPaymentType } = useContextState()


  return (
    <div className='absolute lg:relative top-[-90px] w-full md:w-[400px] bg-white p-4 h-[500px] p-4'>
          {paymentType?
            <PaymentType />
            :
            <div>
                
                <h2>{itemAmount}sol</h2>
        
                  <button className='mt-4 p-2 bg-blue-400 font-bold text-gray-200' onClick={() => setPaymentType(true)}>Complete payment</button>
            </div>
          }
    </div>
  )
}

export default Checkout