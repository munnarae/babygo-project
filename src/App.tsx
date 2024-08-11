import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ListPage from '../src/pages/ListPage';
import DetailPage from '../src/pages/DetailPage';
import Nav from '../src/components/Nav';
import Header from '../src/components/Header';
import CategoryBar from '../src/components/CategoryBar';

function AppContent() {
    const location = useLocation();

    // DetailPage에서는 Header와 CategoryBar를 숨깁니다.
    const hideHeaderAndCategoryBar = location.pathname.includes('/item/');

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full max-w-xl">
                {!hideHeaderAndCategoryBar && <Header />}
                {!hideHeaderAndCategoryBar && <CategoryBar />}
                <div className="flex-grow overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<ListPage />} />
                        <Route path="/item/:id" element={<DetailPage />} />
                    </Routes>
                </div>
                <Nav />
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
