import axios from 'axios';

const BASE_URL = 'https://dev.babygo.kr/api/v1/test/places';

export interface Place {
    name: string;
    category: string;
    thumbnail: string;
    address: string;
    description: string;
    images: string[];
}

export const fetchPlaces = async (page: number): Promise<Place[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: { page },
        });
        return response.data.data; 
    } catch (error) {
        console.error('장소를 가져오는 중에 오류가 발생했습니다:', error);
        throw error;
    }
};
