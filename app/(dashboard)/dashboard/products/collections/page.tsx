'use client'
import { useState, useEffect } from "react";
import axios from "axios";

interface collection {
    id: string,
    name: string,
}

export default function Collections() {
    const [collections, setCollections] = useState<collection[]>([]);


    return (
        <div>
            <h1>Collections</h1>
            <ul>
                {collections?.map((collection) => (
                    <li key={collection.id}>
                        {collection.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}


