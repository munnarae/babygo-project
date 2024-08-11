import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListPage from './page/ListPage';
import Nav from '../src/components/Nav';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col items-center">
                <div className="flex-grow w-full max-w-xl">
                    <Header />
                    <Routes>
                        <Route path="/" element={<ListPage />} />
                    </Routes>
                    <Nav />
                </div>
            </div>
        </Router>
    );
}

export default App;
