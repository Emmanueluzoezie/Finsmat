import React from 'react'
import Checkout from './Checkout'
import ItemsComponent from './ItemsComponent'

function HomeComponent() {
  return (
    <div className='relative lg:flex'>
        <ItemsComponent />
        <Checkout />
    </div>
  )
}

export default HomeComponent