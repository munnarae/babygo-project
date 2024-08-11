import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaceStore } from '../store/usePlaceStore';
import arrowBackIcon from '../assets/arrowback.svg';

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { places, comments, addComment, updateComment, deleteComment } = usePlaceStore();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [newComment, setNewComment] = useState('');

    const item = places[Number(id)];

    if (!item) {
        return <div>아이템을 찾을 수 없습니다.</div>;
    }

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            addComment(id!, newComment.trim());
            setNewComment('');
        }
    };

    const handleUpdateComment = (commentId: number, newText: string) => {
        updateComment(id!, commentId, newText);
    };

    const handleDeleteComment = (commentId: number) => {
        deleteComment(id!, commentId);
    };

    return (
        <div className="min-h-screen bg-white pb-16 relative">
            <div className="bg-white w-full max-w-xl mx-auto flex flex-col">
                <div className="relative">
                    <img className="w-full h-80 object-cover" src={item.images[0]} alt={item.name} />
                    <button className="absolute top-4 left-4 bg-white bg-opacity-70 rounded-full p-2" onClick={() => navigate(-1)}>
                        <img src={arrowBackIcon} alt="뒤로가기" width="24" height="24" />
                    </button>
                </div>

                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
                    <p className="text-blue-600 flex items-center mb-4">
                        <span className="mr-1">📍</span>
                        {item.address}
                    </p>
                    <p className="text-gray-500 mb-2">{item.description}</p>
                </div>

                {item.images.length > 1 && (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-2">더보기</h2>
                        <div className="flex flex-wrap gap-2">
                            {item.images.slice(1).map((image, index) => (
                                <img key={index} className="w-24 h-24 object-cover rounded cursor-pointer" src={image} alt={`${item.name} ${index + 2}`} onClick={() => handleImageClick(image)} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">리뷰작성</h2>
                    <div className="space-y-2">
                        {(comments[id!] || []).map(comment => (
                            <div key={comment.id} className="flex items-center space-x-2">
                                <input className="flex-grow p-2 border border-gray-300 rounded" value={comment.text} onChange={e => handleUpdateComment(comment.id, e.target.value)} />
                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteComment(comment.id)}>
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex mt-4">
                        <input className="flex-grow p-2 border border-gray-300 rounded" placeholder="댓글 추가..." value={newComment} onChange={e => setNewComment(e.target.value)} />
                        <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleAddComment}>
                            추가
                        </button>
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleCloseModal}>
                    <img src={selectedImage} alt="확대된 이미지" className="max-w-full max-h-full object-contain" />
                </div>
            )}
        </div>
    );
};

export default DetailPage;
