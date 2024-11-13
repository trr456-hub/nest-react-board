import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Board {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

export default function Home() {
    const [boardData, setBoardData] = useState<Board[]>([]);
    const navigate = useNavigate();
    const goToWrite = () => {
        navigate('/write');
    };
    const goToDetail = (item: Board) => {
        navigate(`${item.id}`, {
            state: {
                item: item,
            },
        });
    };
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:5000/board');

            console.log(response.data);
            setBoardData(response.data);
        };
        getData();
    }, []);
    return (
        <div>
            <h1>BOARD</h1>
            <div>
                {boardData.map((item) => (
                    <div key={item.id}>
                        <span>{item.id}</span>
                        <span onClick={() => goToDetail(item)}>{item.title}</span>
                        <span>{item.createdAt.toString()}</span>
                    </div>
                ))}
            </div>
            <button onClick={goToWrite}>글쓰기</button>
        </div>
    );
}
