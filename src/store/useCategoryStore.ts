import create from 'zustand';
import { fetchPlaces, Place } from '../services/places';

interface PlaceStore {
    places: Place[];
    allPlaces: Place[]; // 전체 데이터를 유지하기 위한 상태
    loading: boolean;
    hasMore: boolean;
    page: number;
    selectedCategory: string | null; // 선택된 카테고리
    fetchNextPage: () => Promise<void>;
    filterByCategory: (category: string | null) => void; // 카테고리 필터링 함수
}

export const usePlaceStore = create<PlaceStore>((set, get) => ({
    places: [],
    allPlaces: [], // 초기 값
    loading: false,
    hasMore: true,
    page: 1,
    selectedCategory: null, // 초기에는 모든 데이터를 보여줌

    fetchNextPage: async () => {
        const { loading, page, hasMore } = get();
        if (loading || !hasMore) return;

        set({ loading: true });
        try {
            const newPlaces = await fetchPlaces(page);
            set(state => ({
                places: [...state.places, ...newPlaces],
                allPlaces: [...state.allPlaces, ...newPlaces], // 전체 데이터를 유지
                page: state.page + 1,
                hasMore: newPlaces.length > 0,
                loading: false,
            }));
        } catch (error) {
            console.error('장소 데이터 로드 실패:', error);
            set({ loading: false });
        }
    },

    filterByCategory: (category: string | null) => {
        const { allPlaces } = get();
        if (category) {
            const filteredPlaces = allPlaces.filter(place => place.category === category);
            set({ places: filteredPlaces, selectedCategory: category });
        } else {
            set({ places: allPlaces, selectedCategory: null });
        }
    },
}));
