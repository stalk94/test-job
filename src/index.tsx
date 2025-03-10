import { EVENT, send } from "./lib/engine";
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/error';
import Table from './components/table';
import MovieTable from './components/movie-table';
import './style/index.css';


function App() {

    React.useEffect(()=> {
        
    }, []);

    
    return(
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <MovieTable />
                    } />
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}



//------------------------------------------------------------------------
createRoot(document.querySelector(".root")).render(<App/>);
