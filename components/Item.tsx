import Image from 'next/image'
import React from 'react'
import { toast } from 'react-hot-toast'
import { FaMinus, FaShoppingCart } from 'react-icons/fa'
import { MdAdd } from 'react-icons/md'
import { useContextState } from '../context/context'

function Item({data}: any) {
    const { setShowProductDetails, clickedItem, setClickedItem, addToCart, removeFromCart } = useContextState()

    const handleAddToCart = () => {
        toast("✅  An item has been added to cart")
        addToCart(data);
    };

    const handleRemoveFromCart = () => {
        if(clickedItem){
            toast("❌ An item has been remove from to cart")
            removeFromCart(data);
        }
    };


    const handleClickItem = () => {
        setClickedItem(data)
        setShowProductDetails(true)
    }

  return (
      <div className='h-[fit] w-[250px] md:w-[300px] relative' >
          <Image src={data?.thumbnail} alt="" className='h-[250px] md:h-[300px] w-[250px] md:w-[300px]' width={200} height={400} onClick={handleClickItem} />
          <div className='p-2 border-[2px] rounded-bl-md rounded-br-md border-t-0'>
            <div className='absolute top-0 right-0 p-2 bg-red-400'>
                  <h2 className='font-bold'>Discount  {data?.discountPercentage}%</h2>
            </div>
            <h1 className='truncate'>Brand:   {data?.brand}</h1>
            <p className='truncate'>{data?.description}</p>
            <h1>Price: ${data?.price}</h1>
            <div className='flex justify-between'>
                <h2>Add to cart</h2>
                <div className='space-x-2 flex items-center'>
                      <button className='border-[2px] p-1' onClick={handleAddToCart}>
                        <MdAdd /> 
                    </button>
                      <button className='border-[2px] p-1' onClick={handleRemoveFromCart}>
                        <FaMinus /> 
                    </button>
                </div>
            </div>
          </div>
      </div>
  )
}

export default Item