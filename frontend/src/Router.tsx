import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Write from './Write';
import Detail from './detail';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/write" element={<Write />} />
                <Route path="/:id" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}
