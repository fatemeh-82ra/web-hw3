import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import {AppProvider} from "./context/AppContext";
import './App.css';

function App() {
  return (
      <AppProvider> {/* Wrap the application content with the Provider */}
        <div className="app-container">
          <Header />
          <div className="main-content">
            <Canvas />
            <Sidebar />
          </div>
          <Footer />
        </div>
      </AppProvider>
  );
}

export default App;