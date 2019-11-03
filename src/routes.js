import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import Albums from './pages/Albums/Albums';
import Songs from './pages/Songs/Songs';
import NotFound from './pages/NotFound/NotFound'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/albums/:artist" exact component={Albums} />
                <Route path="/songs/:artist" exact component={Songs} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}