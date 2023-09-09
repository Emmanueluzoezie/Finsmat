import React, { useState } from 'react'

function Checkout() {
    const [itemAmount, setItemAmount] = useState(4)
  return (
    <div className='absolute lg:relative top-[-90px] w-full md:w-[400px] bg-white p-4'>
        <h2>{itemAmount}sol</h2>
        <button className='mt-4 p-2 bg-blue-400 font-bold text-gray-200'>Complete payment</button>
    </div>
  )
}

export default Checkout