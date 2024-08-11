import React from 'react';
import searchIcon from '../assets/search.svg';

const Header: React.FC = () => {
    return (
        <header className="w-full bg-white py-4 px-6 border-b border-gray-100 shadow-md flex items-center justify-between">
            <button className="text-xl">
                <img src="https://babygo.kr/assets/images/babygo_logo.png" alt="애기야가자 로고" width="100" height="100" />
            </button>
            <button className="text-xl">
                <img src={searchIcon} alt="검색" width="18" height="18" />
            </button>
        </header>
    );
};

export default Header;
