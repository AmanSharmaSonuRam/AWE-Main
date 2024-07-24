import React from 'react'
import { ProductCard01 } from './ProductCard01'
import { products } from '@/constants/files';


interface Products {
    title?: String,
    price?: Number,
    imgurl?: String,
    mrp?: Number,
}

const ProductCarousal01 = ({ title, price, imgurl, mrp }: Products) => {
    return (
        <div>
            <h3 className='font-bold text-lg p-3'>
                Featured Products
            </h3>
            <div
                className='md:p-3 grid grid-cols-2 md:grid-cols-3 lg:flex'
            >
                {products.map((Products) => (
                    <ProductCard01
                        key={title}
                        title={title}
                        price={price}
                        mrp={mrp}
                    />
                ))}
                <ProductCard01
                    title={title}
                    price={price}
                    mrp={mrp}
                />
            </div>

        </div>
    )
}

export default ProductCarousal01