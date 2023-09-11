import React, { useEffect } from 'react'
import { useContextState } from '../context/context';
import Checkout from './Checkout'
import ItemsComponent from './ItemsComponent'

function HomeComponent() {
    const {setShowCheckout, showCheckout} = useContextState()

  return (
    <div className='relative text-white flex-1 '>
        <ItemsComponent />
        {showCheckout && <div className=""><Checkout /> </div>}
    </div>
  )
}

export default HomeComponent