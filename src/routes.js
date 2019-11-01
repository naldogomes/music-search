import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Albums from './pages/Albums/Albums';
import Songs from './pages/Songs/Songs';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/albums" component={Albums} />
            <Route path="/songs" component={Songs} />
        </BrowserRouter>
    )
}