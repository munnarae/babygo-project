import React from 'react';
import { usePlaceStore } from '../store/usePlaceStore';

const categories = ['애가PASS', '여름물놀이', '이번주핫플', '축제&공연', '키즈숙박', '전시·체험·관람', '키카·테마파크', 'YES키즈존', '자연과함께', '동물친구'];

const CategoryBar: React.FC = () => {
    const { filterByCategory } = usePlaceStore();

    return (
        <div className="fixed top-[64px] z-40 w-full max-w-xl overflow-x-scroll flex space-x-4 p-4 pt-10 bg-yellow-300 border-b border-gray-300 no-scrollbar">
            <button
                className="flex-shrink-0 bg-white border border-gray-300 rounded-xl px-4 py-2 text-center text-sm font-medium"
                onClick={() => filterByCategory(null)} // 전체 보기
            >
                전체
            </button>
            {categories.map((category, index) => (
                <button key={index} className="flex-shrink-0 bg-white border border-gray-300 rounded-xl px-4 py-2 text-center text-sm font-medium" onClick={() => filterByCategory(category)}>
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryBar;
