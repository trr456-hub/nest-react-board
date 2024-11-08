import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Write from './Write';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/write" element={<Write />} />
            </Routes>
        </BrowserRouter>
    );
}
