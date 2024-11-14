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

    const deleteOne = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/board/${id}`);
        } catch (err) {
            console.error(err);
        }
    };
    const updateOne = async (item: Board) => {
        navigate(`update/${item.id}`, {
            state: {
                item,
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
                        <button onClick={() => deleteOne(item.id)}>삭제</button>
                        <button onClick={() => updateOne(item)}>수정</button>
                    </div>
                ))}
            </div>
            <button onClick={goToWrite}>글쓰기</button>
        </div>
    );
}
