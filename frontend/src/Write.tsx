import axios from 'axios';
import { useState } from 'react';

export default function Write() {
    const [title, setTitle] = useState<String>('');
    const [content, setContent] = useState<String>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/board', {
                title,
                content,
            });
            console.log('게시글 등록 완료', response.data);

            setTitle('');
            setContent('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Write</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="content" onChange={(e) => setContent(e.target.value)}></textarea>
                <button type="submit">add</button>
            </form>
        </div>
    );
}
