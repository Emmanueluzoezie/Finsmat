import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useContextState } from '../context/context'
import CheckoutItems from './CheckoutItems'
import PaymentType from './PaymentType'

function Checkout() {
    const [itemAmount, setItemAmount] = useState(4)
    const { paymentType, setPaymentType, setShowCheckout, cartItems } = useContextState()

    const getTotalPrice = (cart: { [key: number]: any & { quantity: number } }) => {
        let totalPrice = 0;
        for (const id in cart) {
            totalPrice += parseFloat(cart[id].price) * cart[id].quantity;
        }
        return totalPrice;
    };

    const totalPrice = getTotalPrice(cartItems)


  return (
    <div className='fixed top-[90px] md:top-[80px] w-full md:w-[500px] md:right-0 h-inherit'>
          <div className={`w-[100%] md:w-[500px] h-inherit bg-white ${paymentType ? "h-[400px]" : "h-[90%]"}`}>
              {paymentType ?
                  <PaymentType />
                  :
                  <div>
                      {Object.keys(cartItems).length === 0 ?
                      <div className='text-black h-[200px] flex flex-col'>
                              <div className='relative'>
                                  <div className='absolute top-2 left-3 cursor-pointer hover:bg-gray-200 p-2 rounded-full text-black ' onClick={() => setShowCheckout(false)}>
                                      <MdClose className='text-2xl' />
                                  </div>
                                  <h2 className='text-black text-center pt-2'>Your Items</h2>
                              </div>
                              <div className='flex-1 flex justify-center items-center'>
                                  <h2 className='text-xl font-semibold'>You don't have any Item in Cart</h2>
                              </div>
                      </div>
                    :
                          <div className='relative h-[700px]'>
                             <div className='relative'>
                                  <div className='absolute top-2 left-3 cursor-pointer hover:bg-gray-200 p-2 rounded-full text-black ' onClick={() => setShowCheckout(false)}>
                                      <MdClose className='text-2xl' />
                                  </div>
                                  <h2 className='text-black text-center pt-2'>Your Items</h2>
                             </div>
                              <div className=' flex flex-col text-black px-4'>
                                  <CheckoutItems />
                                  {/* <h2>{totalPrice}</h2> */}
                                  <div>
                                      <h2 className='font-semibold text-xl'>Total:  <span className='font-bold'>${totalPrice}</span></h2>
                                  </div>
                                  <button className='mt-4 p-2 rounded-md bg-blue-400 font-bold text-gray-200 w-full' onClick={() => setPaymentType(true)}>Complete payment</button>
                              </div>
                          </div>
                    }
                  </div>
              }
         </div>
    </div>
  )
}

export default Checkout