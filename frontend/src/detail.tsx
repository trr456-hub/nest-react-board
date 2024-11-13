import { useLocation } from 'react-router-dom';

export default function Detail() {
    const location = useLocation();
    const arr = location.state.item;
    return (
        <div>
            <h1>detail</h1>
            <span>{arr.content}</span>
        </div>
    );
}
