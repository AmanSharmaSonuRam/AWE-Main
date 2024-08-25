'use client'
import { useState, useEffect } from "react";
import axios from "axios";

interface category {
    id: string,
    name: string,
}

export default function Categories() {
    const [categories, setCategories] = useState<category[]>([]);


    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories?.map((category) => (
                    <li key={category.id}>
                        {category?.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}


