import { createQR } from '@solana/pay';
import React, { useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useContextState } from '../context/context';


function ScanCodeView() {
    const qrRef = useRef<HTMLDivElement | null>(null);
    const { setShowCode, showCode } = useContextState()
    const amount = 0
    const userId = 23
    const receiverPublicKey = process.env.RECIEVER_PUBLIC_KEY
    
    const SOLANA_PAY_URL = `solana:https://solana-bounty-sigma.vercel.app/api/transactions?amount=${amount}&userId=${userId}&receiverPublicKey=${receiverPublicKey}`;

    useEffect(() => {
        const qr = createQR(SOLANA_PAY_URL, 250, 'white', 'black');

        // Set the generated QR code on the QR ref element
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qr.append(qrRef.current);
            console.log("appended");
        }
    }, []);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-fit absolute top-10 left-10 cursor-pointer hover:bg-gray-200 p-2 rounded-full' onClick={() => setShowCode(false)}>
                <FaArrowLeft />
            </div>
            <h1 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
                Scan to proceed
            </h1>
            <div ref={qrRef} />
        </div>
    );
}

export default ScanCodeView;