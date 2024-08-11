import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { items } from '../api/sample';
import arrowBackIcon from '../assets/arrowback.svg'; // SVG 파일 import

const ItemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const item = items.find(item => item.id === parseInt(id!));

    if (!item) {
        return <div>아이템을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="min-h-screen bg-white pb-16">
            <div className="bg-white w-full max-w-xl mx-auto flex flex-col">
                <div className="relative">
                    <img className="w-full h-96 object-cover" src={item.images} alt={item.name} />
                    <button className="absolute top-4 left-4 bg-white bg-opacity-70 rounded-full p-2" onClick={() => navigate(-1)}>
                        <img src={arrowBackIcon} alt="뒤로가기" width="24" height="24" />
                    </button>
                </div>

                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
                    <p className="text-blue-600 flex items-center mb-4">
                        <span className="mr-1">📍</span>
                        {item.address}
                    </p>
                    <p className="text-gray-500 mb-2">{item.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailPage;
