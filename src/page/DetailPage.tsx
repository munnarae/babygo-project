import React from 'react';
import { useParams } from 'react-router-dom';
import { items } from '../api/sample'; 

const ItemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const item = items.find(item => item.id === parseInt(id!));

    if (!item) {
        return <div>아이템을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 pb-16">
            <div className="bg-white w-full max-w-xl h-full min-h-screen flex flex-col p-4">
                <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
                <img className="w-full h-64 object-cover rounded-lg mb-4" src={item.imageUrl} alt={item.name} />
                <p className="text-gray-700 mb-2">{item.detail}</p>
                <p className="text-gray-500">Count: {item.count}</p>
            </div>
        </div>
    );
};

export default ItemDetailPage;
