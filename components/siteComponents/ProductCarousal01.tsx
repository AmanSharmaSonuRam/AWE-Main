import React from 'react'
import { ProductCard01 } from './ProductCard01'
import { products } from '@/constants/files';
import { Product } from '@/typing';




type Products = {
    products: Product[]

}

const ProductCarousal01 = () => {
    return (
        <div>
            <h3 className='font-bold text-lg p-3'>
                Featured Products
            </h3>
            <div
                className='md:p-3 grid grid-cols-2 md:grid-cols-3 lg:flex'
            >
                {products.map(item => (

                <ProductCard01
                key={item.title}
                    title={item.title}
                    price={item.price}
                    mrp={item.mrp}
                />
                ))}


            </div>

        </div>
    )
}

export default ProductCarousal01