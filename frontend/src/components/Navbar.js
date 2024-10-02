import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Você pode criar um CSS separado para estilizar a Navbar

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/appointments">Agendamentos</Link>
                </li>
                <li>
                    <Link to="/history">Histórico</Link>
                </li>
                <li>
                    <Link to="/reviews">Avaliações</Link>
                </li>
                <li>
                    <Link to="/profile">Perfil</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
