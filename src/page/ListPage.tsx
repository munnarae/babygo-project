import React from 'react';
import { Link } from 'react-router-dom';
import { items } from '../api/sample';

const categories = ['애가PASS', '여름물놀이', '이번주핫플', '축제&공연', '키즈숙박', '전시·체험·관람', '키카·테마파크', 'YES키즈존', '자연과함께', '동물친구'];

const ListPage: React.FC = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-20 pb-16">
            <div className="bg-white w-full max-w-xl h-full min-h-screen flex flex-col">
                <div className="flex-grow overflow-auto px-4 pt-2 space-y-7 shadow-md">
                    <div className="overflow-x-scroll flex space-x-4 p-4 bg-white">
                        {categories.map((category, index) => (
                            <div key={index} className="flex-shrink-0 bg-white border border-gray-300 rounded-xl px-4 py-2 text-center text-sm font-medium">
                                {category}
                            </div>
                        ))}
                    </div>
                    {items.map(item => (
                        <Link key={item.id} to={`/item/${item.id}`}>
                            <div className="w-full flex items-center p-5">
                                <img className="w-36 h-36 object-cover rounded-lg mr-4" src={item.imageUrl} alt={item.name} />
                                <div>
                                    <p className="text-gray-500">{item.detail}</p>
                                    <p className="text-gray-500">count: {item.count}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListPage;
