import React, { useEffect } from 'react'
import { useContextState } from '../context/context';
import Checkout from './Checkout'
import ItemsComponent from './ItemsComponent'

function HomeComponent() {
    const {setShowCheckout, showCheckout} = useContextState()

    useEffect(() => {
        // Initial check
        if (window.innerWidth > 1000) {
            setShowCheckout(true);
        } else {
            setShowCheckout(false);
        }

        // Listener for window resize
        const handleResize = () => {
            if (window.innerWidth > 1000) {
                setShowCheckout(true);
            } else {
                setShowCheckout(false);
            }
        };

        // Attach the listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
    <div className='relative lg:flex text-white'>
        <ItemsComponent />
        {showCheckout && <div className='p-4 md:p-0'><Checkout /> </div>}
    </div>
  )
}

export default HomeComponent