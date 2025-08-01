import React, { useContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppProvider, AppContext } from "./context/AppContext";
import './App.css';

function AppContent() {
    const { currentUser } = useContext(AppContext);

    if (!currentUser) {
        return <Login />;
    }

    return (
        <div className="app-container">
            <Header />
            <div className="main-content">
                <Canvas />
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

export default App;