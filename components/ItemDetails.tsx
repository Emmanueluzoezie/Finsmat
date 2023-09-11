import Image from 'next/image'
import React from 'react'
import { FaMinus } from 'react-icons/fa'
import { MdAdd, MdClose } from 'react-icons/md'
import { useContextState } from '../context/context'

function ItemDetails() {
    const { setShowProductDetails, clickedItem, addToCart, removeFromCart} = useContextState()

    const handleAddToCart = () => {
        if(!clickedItem) return
            addToCart(clickedItem);
            
    };

    const handleRemoveFromCart = () => {
        if(clickedItem){
            removeFromCart(clickedItem);
        }
    };

    return (
        <div className='h-full px-8 py-4 text-black' onClick={() => { }}>
            <button className='p-2 ml-[-10px] hover:bg-gray-200 rounded-full' onClick={() => setShowProductDetails(false)}>
                <MdClose className='text-2xl hho'/>
            </button>
            <div className='flex items-center justify-center h-full flex-col flex-1'>
                <h2 className='text-center capitalize mt-2 font-semibold text-xl'>{clickedItem?.category}</h2>
                <div className='flex justify-center'>
                    {clickedItem && <Image src={clickedItem?.thumbnail} alt="" className='' width={200} height={200} />}
                </div>
                <div className='flex'>
                    {clickedItem?.images?.map( image => 
                        <Image src={image} alt="" className='h-[100px] md:h-[100px] w-[60px] md:w-[100px]' width={200} height={400} />
                    )}
                </div>
                <div className=' text-black break-words'>
                    <h2 className='text-center mt-2 font-semibold text-xl'>{clickedItem?.brand}</h2>
                    <h2 className='text-center font-semibold text-xl'>{clickedItem?.title}</h2>
                    <h2>{clickedItem?.title}</h2>
                    <p className=''>{clickedItem?.description}</p>
                    <div className='flex space-x-5 pt-2'>
                        <h1 className='font-bold'>Amount:</h1>
                        <h1 className='font-semibold'>${clickedItem?.price}</h1>
                    </div>
                    <div className='flex space-x-5 pt-2'>
                        <h1 className='font-bold'>Discount:</h1>
                        <h1 className='font-semibold'>{clickedItem?.discountPercentage}%</h1>
                    </div>
                    <div className='flex items-center justify-between p-4'>
                        <h2 className='font-bold'>Add more cart</h2>
                        <div className='space-x-4 text-white flex items-center'>
                            <button className='border-[2px] p-2 hover:bg-white hover:text-[#943deb] bg-[#943deb]' onClick={handleAddToCart}>
                                <MdAdd className='text-2xl'/>
                            </button>
                            <button className='border-[2px] p-2 hover:bg-white  hover:text-[#943deb] bg-[#943deb]' onClick={handleRemoveFromCart}>
                                <FaMinus className='text-2xl'/>
                            </button>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetails