import create from 'zustand';
import { fetchPlaces, Place } from '../services/places';

interface PlaceStore {
    places: Place[];
    loading: boolean;
    hasMore: boolean;
    page: number;
    fetchNextPage: () => Promise<void>;
}

export const usePlaceStore = create<PlaceStore>((set, get) => ({
    places: [],
    loading: false,
    hasMore: true,
    page: 1,
    fetchNextPage: async () => {
        const { loading, page, hasMore } = get();
        if (loading || !hasMore) return;

        set({ loading: true });
        try {
            const newPlaces = await fetchPlaces(page);
            set(state => ({
                places: [...state.places, ...newPlaces],
                page: state.page + 1,
                hasMore: newPlaces.length > 0,
                loading: false,
            }));
        } catch (error) {
            console.error('장소데이터 로드 실패:', error);
            set({ loading: false });
        }
    },
}));
