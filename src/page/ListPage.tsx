import React from 'react';
import { Link } from 'react-router-dom';
import { items } from '../api/sample';

const ListPage: React.FC = () => {
    return (
        <div className="bg-white w-full max-w-xl min-h-screen flex flex-col mt-[78px]">
            <div className="flex-grow overflow-y-auto px-4 pt-2 space-y-7">
                {items.map(item => (
                    <Link key={item.id} to={`/item/${item.id}`}>
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
