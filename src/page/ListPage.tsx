import React from 'react';

const items = [
    {
        id: 1,
        name: '카페 시온',
        detail: 'Item Detail 1',
        count: 1,
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: '드네이쳐',
        detail: 'Item Detail 2',
        count: 1,
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        name: '괴정3동 작은도서관',
        detail: 'Item Detail 3',
        count: 1,
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 4,
        name: '파티모먼트',
        detail: 'Item Detail 4',
        count: 1,
        imageUrl: 'https://via.placeholder.com/150',
    },
];

const ListPage: React.FC = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 pb-16">
            <div className="bg-white w-full max-w-xl h-full min-h-screen flex flex-col">
                <div className="flex-grow overflow-auto px-4 pt-4 space-y-4 shadow-md">
                    {items.map(item => (
                        <div key={item.id} className="w-full bg-gray-100 rounded-lg shadow-md flex items-center p-8">
                            <img className="w-36 h-36 object-cover rounded-lg mr-4" src={item.imageUrl} alt={item.name} />
                            <div>
                                <p className="text-gray-500">{item.detail}</p>
                                <p className="text-gray-500">count: {item.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListPage;
