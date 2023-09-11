import Image from 'next/image'
import React from 'react'
import { toast } from 'react-hot-toast'
import { FaMinus } from 'react-icons/fa'
import { MdAdd } from 'react-icons/md'
import { useContextState } from '../context/context'

function CheckoutItem({data}:any) {
    const { clickedItem, addToCart, removeFromCart } = useContextState()

    const handleAddToCart = () => {
        if (!data) return
        toast("✅  An item has been added to cart")
        addToCart(data);

    };

    const handleRemoveFromCart = () => {
        if (!data) return
        toast("❌ An item has been remove from to cart")

            removeFromCart(data);
    };

  return (
      <div className='py-4 relative my-4 border-[2px] px-4'>
          <div className='flex'>
              <div className=' pr-6'>
                  <Image className='w-[130px] h-[130px]' src={data?.thumbnail} width={100} height={100} alt="" />
              </div>
              <div className=' flex-1 truncate'>
                  <h1 className='font-semibold'>{data?.brand}</h1>
                  <h1>{data?.title}</h1>
                  <h1 className=''>{data?.description}</h1>
                  <h1>quantity: <span className='font-semibold'>{data.quantity}</span></h1>
                  <h1>Price: <span className='font-semibold'>${data.price}</span></h1>
                  <h1 className='absolute top-0 right-0 text-sm text-white p-2 bg-[#943deb]  font-semibold'>Discount {data.discountPercentage}%</h1>
              </div>
          </div>
          <div className='flex items-center pt-2'>
              <div className='flex-1'>
                  <h1>Total amount: <span className='font-semibold'>${data.price * data.quantity}</span></h1>
              </div>
              <div className='flex-1 flex items-center justify-between px-4'>
                  <h2 className='font-bold'>Add more cart</h2>
                  <div className='space-x-4 text-white flex items-center'>
                      <button className='border-[2px] p-[2px] hover:bg-white hover:text-[#943deb] bg-[#943deb]' onClick={handleAddToCart}>
                          <MdAdd className='text-2xl' />
                      </button>
                      <button className='border-[2px] p-[4px] hover:bg-white  hover:text-[#943deb] bg-[#943deb]' onClick={handleRemoveFromCart}>
                          <FaMinus className='text-xl' />
                      </button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default CheckoutItem