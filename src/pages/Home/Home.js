import React, { useState } from 'react';
import api from '../../services/api';
import './Home.css';

import logo from '../../assets/logo.png';


export default function Home() {
    const [search, setSearch] = useState('');
    const [select, setSelect] = useState('album');

    async function handleSubmit(e) {
        e.preventDefault();

        const correctedSearch = search.replace(/\s+/g, ' '); //removing consecutive spaces if there's any
        const artist = correctedSearch.split(' ').join('+'); //replacing spaces with +

        const ENDPOINT = `/search?term=${artist}&entity=${select}`
        
        const response = await api.get(ENDPOINT)

        console.log(response.data);
        

        
    }

    return (
        <div className="home-container">
            <form onSubmit={handleSubmit}>
            <img src={logo} alt="Music Search" />
                <div className="search-form">
                    <select value={select} onChange={e => setSelect(e.target.value)}>
                        <option value="album">Albums</option>
                        <option value="song">Songs</option>
                    </select>
                    <input
                        placeholder="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}