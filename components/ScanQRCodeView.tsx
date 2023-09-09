import { createQR } from '@solana/pay';
import React, { useEffect, useRef } from 'react';

const SOLANA_PAY_URL = "solana:https://solana-pay-demo-loopcreativeandy.vercel.app/api/hello";

function ScanCodeView() {
    const qrRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const qr = createQR(SOLANA_PAY_URL, 360, 'white', 'black');

        // Set the generated QR code on the QR ref element
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qr.append(qrRef.current);
            console.log("appended");
        }
    }, []);

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
                Scan to proceed
            </h1>
            <div ref={qrRef} />
        </div>
    );
}

export default ScanCodeView;