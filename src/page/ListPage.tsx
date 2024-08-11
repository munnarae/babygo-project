import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlaces, Place } from '../api/places';

const ListPage: React.FC = () => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPlaces = async () => {
            try {
                const data = await fetchPlaces(1); // 페이지 1 데이터를 가져옴
                setPlaces(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch places:', error);
                setLoading(false);
            }
        };

        loadPlaces();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white w-full max-w-xl min-h-screen flex flex-col mt-[78px]">
            <div className="flex-grow overflow-y-auto px-4 pt-2 space-y-7">
                {places.map((item, index) => (
                    <Link key={index} to={`/item/${index}`}>
                        <div className="w-full flex items-center p-5">
                            <img className="w-36 h-36 object-cover rounded-lg mr-4" src={item.thumbnail} alt={item.name} />
                            <div>
                                <p className="text-gray-500">{item.name}</p>
                                <p className="text-gray-500">{item.address}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ListPage;
