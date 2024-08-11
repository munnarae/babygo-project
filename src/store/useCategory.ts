import create from 'zustand';
import { fetchPlaces, Place } from '../services/places';

interface CategoryStoreState {
    selectedCategory: string | null;
    places: Place[];
    loading: boolean;
    hasMore: boolean;
    page: number;
    fetchPlacesByCategory: (category: string) => void;
    fetchNextPage: () => void;
}

export const useCategoryStore = create<CategoryStoreState>((set, get) => ({
    selectedCategory: null,
    places: [],
    loading: false,
    hasMore: true,
    page: 1,

    fetchPlacesByCategory: async (category: string) => {
        set({ loading: true, selectedCategory: category, places: [], page: 1 });

        try {
            const places = await fetchPlaces(1);
            const filteredPlaces = places.filter(place => place.category === category);
            set({
                places: filteredPlaces,
                loading: false,
                hasMore: filteredPlaces.length > 0,
            });
        } catch (error) {
            console.error('카테고리별로 장소를 가져오지 못했습니다:', error);
            set({ loading: false });
        }
    },

    fetchNextPage: async () => {
        const { page, selectedCategory, places } = get();
        if (!selectedCategory) return;

        set({ loading: true });

        try {
            const newPlaces = await fetchPlaces(page + 1);
            const filteredPlaces = newPlaces.filter(place => place.category === selectedCategory);
            set({
                places: [...places, ...filteredPlaces],
                loading: false,
                hasMore: filteredPlaces.length > 0,
                page: page + 1,
            });
        } catch (error) {
            console.error('더 많은 장소를 가져오지 못했습니다:', error);
            set({ loading: false });
        }
    },
}));
