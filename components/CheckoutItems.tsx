import Image from 'next/image';
import React from 'react'
import { useContextState } from '../context/context';
import CheckoutItem from './CheckoutItem';

function CheckoutItems() {
    const { cartItems} = useContextState()

  return (
      <div className='h-[530px] flex-1'>
          <div className='overflow-scroll h-[inherit]'>
              {Object.keys(cartItems).map((key) => {
              const item = cartItems[parseInt(key)];
              return(
                  <CheckoutItem data={item} key={item.id}/>
                  )
              })}
        </div>
    </div>
  )
}

export default CheckoutItems