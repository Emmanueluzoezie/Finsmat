import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useContextState } from '../context/context'
import PaymentType from './PaymentType'

function Checkout() {
    const [itemAmount, setItemAmount] = useState(4)
    const { paymentType, setPaymentType, setShowCheckout } = useContextState()


  return (
    <div className='absolute lg:relative top-[-0px] flex justify-end w-full'>
          <div className='w-[90%] md:w-[400px] bg-white h-[500px]'>
              {paymentType ?
                  <PaymentType />
                  :
                  <div className='relative'>
                      <div className='w-fit absolute top-4 left-3 cursor-pointer hover:bg-gray-200 p-2 rounded-full text-black ' onClick={() => setShowCheckout(false)}>
                          <MdClose className='text-2xl'/>
                      </div>
                      <div className='pt-10'>
                          <h2>{itemAmount}sol</h2>

                          <button className='mt-4 p-2 bg-blue-400 font-bold text-gray-200' onClick={() => setPaymentType(true)}>Complete payment</button>
                      </div>
                  </div>
              }
         </div>
    </div>
  )
}

export default Checkout