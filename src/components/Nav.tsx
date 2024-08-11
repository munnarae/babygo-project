import React from 'react';
import homeIcon from '../assets/home.svg';
import placeIcon from '../assets/place.svg';
import storeIcon from '../assets/store.svg';
import talkIcon from '../assets/talk.svg';
import infoIcon from '../assets/info.svg';

const Nav: React.FC = () => {
    return (
        <nav className="w-full max-w-xl bg-white py-0 shadow-md flex justify-around fixed bottom-0 border-t border-gray-100">
            <button className="flex flex-col items-center text-gray-500">
                <img src={homeIcon} alt="홈" width="24" height="24" className="text-gray-200" />
                <span className="text-sm">홈</span>
            </button>
            <button className="flex flex-col items-center text-gray-500">
                <img src={placeIcon} alt="장소" width="24" height="24" className="text-gray-200" />
                <span className="text-sm">장소</span>
            </button>
            <button className="flex flex-col items-center text-gray-500">
                <img src={storeIcon} alt="스토어" width="24" height="24" className="text-gray-200" />
                <span className="text-sm">스토어</span>
            </button>
            <button className="flex flex-col items-center text-gray-500">
                <img src={talkIcon} alt="애기톡" width="24" height="24" className="text-gray-200" />
                <span className="text-sm">애기톡</span>
            </button>
            <button className="flex flex-col items-center text-gray-500">
                <img src={infoIcon} alt="내정보" width="24" height="24" className="text-gray-200" />
                <span className="text-sm">내정보</span>
            </button>
        </nav>
    );
};

export default Nav;
