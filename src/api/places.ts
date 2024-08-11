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
        console.error('Error fetching places:', error);
        throw error;
    }
};
