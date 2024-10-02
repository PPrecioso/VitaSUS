import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '.public/css/style.css'; // Ajuste o caminho conforme necessário

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
