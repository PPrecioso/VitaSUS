import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../public/index.html'; // Ajuste se necessário
import Appointments from '../public/appointments.html'; // Ajuste se necessário
import History from '../public/history.html'; // Ajuste se necessário
import Reviews from '../public/reviews.html'; // Ajuste se necessário
import Profile from '../public/profile.html'; // Ajuste se necessário
import Navbar from './components/Navbar'; // Importando o componente Navbar

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/appointments" component={Appointments} />
                <Route path="/history" component={History} />
                <Route path="/reviews" component={Reviews} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </Router>
    );
}

export default App;
