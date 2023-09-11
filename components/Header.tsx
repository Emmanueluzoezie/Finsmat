import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { FaShoppingCart } from 'react-icons/fa'
import { useContextState } from '../context/context'

function Header() {
  const { showCheckout, setShowCheckout, cartItems, paymentType, setPaymentType } = useContextState()
    const { data: session } = useSession()

  const getTotalItems = (cart: { [key: number]: any & { quantity: number } }) => {
    let total = 0;
    for (const id in cart) {
      total += cart[id].quantity;
    }
    return total;
  };

  const handleCartClick = () => {
    setShowCheckout(!showCheckout)
    if (showCheckout && paymentType){
      setPaymentType(false)
    }
  }

  const totalItems = getTotalItems(cartItems)

  return (
    <div className='text-white border-gray-500 border-b-2'>
        <div className='flex justify-between p-6 md:px-10'>
            <div>
                <h2>Solana bounty</h2>
            </div>
            <nav className='flex space-x-4 md:space-x-8'>
                <div className='flex space-x-2'>
                    <h2>Register</h2>
            <div className='relative pt-2 cursor-pointer' onClick={handleCartClick}>
                        <FaShoppingCart className='text-xl'/>
              <h2 className='absolute top-[-8px] text-[#943deb] text-[18px] font-bold pl-1'>{totalItems}</h2>
                    </div>
                </div>
                {session?
                    <button onClick={() => signIn()} className="bg-[#943deb] px-2 font-semibold ">Logout</button>
                    :
                    <button onClick={() => signIn()} className="bg-[#943deb] px-2 font-semibold ">Login</button>
                }
                </nav>
            </div>
    </div>
  )
}

export default Header