import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './contexts/AuthContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));  // Use createRoot
root.render(
    <React.StrictMode>
            <BrowserRouter>
            <AuthContextProvider>
                <ToastContainer theme='dark' position='top-right'
                autoClose = {4000} closeOnClick pauseOnHover = {false} />
                <App />
            </AuthContextProvider>
            </BrowserRouter>
    </React.StrictMode>
);
