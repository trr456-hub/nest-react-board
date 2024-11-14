import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Update() {
    const location = useLocation();
    const board = location.state.item;

    const [title, setTitle] = useState(board.title);
    const [content, setContent] = useState(board.content);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`http://localhost:5000/board/${board.id}`, {
                title,
                content,
            });
            console.log('게시글 수정 완료', response.data);

            setTitle('');
            setContent('');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button type="submit">add</button>
            </form>
        </div>
    );
}
