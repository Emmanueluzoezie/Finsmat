import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useContextState } from '../context/context'
import Item from './Item'
import ItemDetails from './ItemDetails'

function ItemsComponent() {
  const { showProductDetails } = useContextState()
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('https://dummyjson.com/product')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div className='flex-1 flex justify-center w-screen p-10 md:px-10 lg:px-20'>
        <div className='flex flex-wrap justify-center gap-10'>
          {products?.map((product: any) => (
            <Item data={product} key={product.id}/>
          ))}
      </div>
      {showProductDetails &&
        <div className='fixed h-fit w-[400px] shadow-xl rounded-xl top-[100px] bg-white break-normal break-words'>
          <ItemDetails />
        </div>
      }
    </div>
  )
}

export default ItemsComponent