import React from 'react'
import { useContextState } from '../context/context'
import ScanCodeView from './ScanQRCodeView'
import { FaArrowLeft } from "react-icons/fa"

function PaymentType() {
    const {setShowCode, showCode, setPaymentType} = useContextState()

  return (
      <div className='border-2 h-full p-4 flex justify-center items-center'>
          <div className='w-fit absolute top-10 left-10 cursor-pointer hover:bg-gray-200 p-2 rounded-full' onClick={() => setPaymentType(false)}>
              <FaArrowLeft />
          </div>
          {showCode?
            <ScanCodeView />
            :
            <div className='flex flex-col w-[300px]'>
                <button className='mt-4 p-2 bg-blue-400 font-bold text-gray-200'>Pay with wallet</button>
                <h2 className='text-center font-bold pt-2'>OR</h2>
                <button className='mt-4 p-2 bg-blue-400 font-bold text-gray-200' onClick={() => setShowCode(true)}>Scan QR Code</button>
            </div>
          }
      </div>
  )
}

export default PaymentType