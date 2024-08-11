import React, { useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePlaceStore } from '../store/usePlaceStore';

const ListPage: React.FC = () => {
    const { places, loading, hasMore, fetchNextPage } = usePlaceStore();
    const observer = useRef<IntersectionObserver | null>(null);

    const lastPlaceElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchNextPage();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore, fetchNextPage],
    );

    useEffect(() => {
        if (places.length === 0) {
            fetchNextPage();
        }
    }, [fetchNextPage, places.length]);

    return (
        <div className="bg-white w-full max-w-xl min-h-screen flex flex-col mt-[78px]">
            <div className="flex-grow overflow-y-auto px-4 pt-2 space-y-7">
                {places.map((item, index) => (
                    <Link key={index} to={`/item/${index}`}>
                        <div ref={index === places.length - 1 ? lastPlaceElementRef : null} className="w-full flex items-center p-5">
                            <img className="w-36 h-36 object-cover rounded-lg mr-4" src={item.thumbnail} alt={item.name} />
                            <div>
                                <p className="text-gray-500">{item.name}</p>
                                <p className="text-gray-500">{item.address}</p>
                            </div>
                        </div>
                    </Link>
                ))}
                {loading && <div>Loading more...</div>}
            </div>
        </div>
    );
};

export default ListPage;
