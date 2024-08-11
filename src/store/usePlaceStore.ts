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
    places: [], // 현재 보여지고 있는 장소 리스트
    allPlaces: [], // 모든 장소 리스트 (필터링되지 않은 상태)
    loading: false, // 데이터 로딩 상태
    hasMore: true, // 추가 데이터를 가져올 수 있는지 여부
    page: 1, // 현재 페이지 번호
    selectedCategory: null, // 선택된 카테고리 (필터링용)
    comments: {}, // 장소에 대한 댓글

    // 무한 스크롤 지원
    fetchNextPage: async () => {
        const { loading, page, hasMore } = get();
        if (loading || !hasMore) return;

        set({ loading: true });
        try {
            const newPlaces = await fetchPlaces(page);
            set(state => ({
                places: [...state.places, ...newPlaces], // 기존의 장소 리스트에 새로 가져온 장소 추가
                allPlaces: [...state.allPlaces, ...newPlaces], // 전체 장소 리스트에도 추가
                page: state.page + 1, // 다음 페이지로 이동
                hasMore: newPlaces.length > 0, // 더 가져올 데이터가 있는지 확인
                loading: false,
            }));
        } catch (error) {
            console.error('장소 불러오기 실패:', error);
            set({ loading: false });
        }
    },

    // 카테고리 필터링 함수
    filterByCategory: (category: string | null) => {
        const { allPlaces } = get();
        if (category) {
            // 선택된 카테고리에 맞는 장소들만 필터링하여 표시
            const filteredPlaces = allPlaces.filter(place => place.category === category);
            set({ places: filteredPlaces, selectedCategory: category });
        } else {
            // 카테고리가 선택되지 않은 경우 모든 장소를 표시
            set({ places: allPlaces, selectedCategory: null });
        }
    },

    // 댓글 추가 함수
    addComment: (placeId: string, text: string) => {
        set(state => {
            const newComment: Comment = { id: Date.now(), text }; // 새로운 댓글 생성
            const updatedComments = [...(state.comments[placeId] || []), newComment]; // 기존 댓글 리스트에 추가
            return {
                comments: {
                    ...state.comments,
                    [placeId]: updatedComments, // 해당 장소의 댓글 리스트 업데이트
                },
            };
        });
    },

    // 댓글 수정 함수
    updateComment: (placeId: string, commentId: number, newText: string) => {
        set(state => {
            const updatedComments = state.comments[placeId].map(comment => (comment.id === commentId ? { ...comment, text: newText } : comment)); // 특정 댓글을 찾아서 텍스트 수정
            return {
                comments: {
                    ...state.comments,
                    [placeId]: updatedComments, // 업데이트된 댓글 리스트 저장
                },
            };
        });
    },

    // 댓글 삭제 함수
    deleteComment: (placeId: string, commentId: number) => {
        set(state => {
            const updatedComments = state.comments[placeId].filter(comment => comment.id !== commentId); // 특정 댓글을 리스트에서 제거
            return {
                comments: {
                    ...state.comments,
                    [placeId]: updatedComments, // 업데이트된 댓글 리스트 저장
                },
            };
        });
    },
}));
