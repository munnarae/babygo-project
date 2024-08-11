import create from 'zustand';
import { fetchPlaces, Place } from '../services/places';

interface Comment {
    id: number;
    text: string;
}

interface PlaceStore {
    places: Place[];
    allPlaces: Place[];
    loading: boolean;
    hasMore: boolean;
    page: number;
    selectedCategory: string | null;
    comments: Record<string, Comment[]>; // Place id를 키로 하는 댓글 관리
    fetchNextPage: () => Promise<void>;
    filterByCategory: (category: string | null) => void;
    addComment: (placeId: string, text: string) => void;
    updateComment: (placeId: string, commentId: number, newText: string) => void;
    deleteComment: (placeId: string, commentId: number) => void;
}

export const usePlaceStore = create<PlaceStore>((set, get) => ({
    places: [],
    allPlaces: [],
    loading: false,
    hasMore: true,
    page: 1,
    selectedCategory: null,
    comments: {},

    fetchNextPage: async () => {
        const { loading, page, hasMore } = get();
        if (loading || !hasMore) return;

        set({ loading: true });
        try {
            const newPlaces = await fetchPlaces(page);
            set(state => ({
                places: [...state.places, ...newPlaces],
                allPlaces: [...state.allPlaces, ...newPlaces],
                page: state.page + 1,
                hasMore: newPlaces.length > 0,
                loading: false,
            }));
        } catch (error) {
            console.error('장소 불러오기 실패:', error);
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

    addComment: (placeId: string, text: string) => {
        set(state => {
            const newComment: Comment = { id: Date.now(), text };
            const updatedComments = [...(state.comments[placeId] || []), newComment];
            return {
                comments: {
                    ...state.comments,
                    [placeId]: updatedComments,
                },
            };
        });
    },

    updateComment: (placeId: string, commentId: number, newText: string) => {
        set(state => {
            const updatedComments = state.comments[placeId].map(comment => (comment.id === commentId ? { ...comment, text: newText } : comment));
            return {
                comments: {
                    ...state.comments,
                    [placeId]: updatedComments,
                },
            };
        });
    },

    deleteComment: (placeId: string, commentId: number) => {
        set(state => {
            const updatedComments = state.comments[placeId].filter(comment => comment.id !== commentId);
            return {
                comments: {
                    ...state.comments,
                    [placeId]: updatedComments,
                },
            };
        });
    },
}));
