import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import './Songs.css'

import logo from '../../assets/logo.svg'
import api from '../../services/api';

export default function Songs({ history, match }) {
    const [ search, setSearch ] = useState('');
    const [ songs, setSongs ] = useState([]);
    const [ containerType, setContainerType ] = useState('');

    const { artist } = match.params;

    useEffect(() => {
        setSongs([]);
        let correctedSearch = artist.split('+').join(' ');
        setSearch(correctedSearch);
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        async function loadSongs() {
            const ENDPOINT = `/search?term=${artist}&entity=song&limit=100` 
            const response = await api.get(ENDPOINT)
        
            setSongs(response.data.results); 
        }

        loadSongs();
    }, [artist])

    useEffect(() => {
        return () => {
            window.removeEventListener('resize', updateWindowDimensions);
        }
    }, []);

    function updateWindowDimensions() {
        if(window.innerWidth <= 720) {
            setContainerType("mobile");
        }
        else if(window.innerWidth > 720 && window.innerWidth <= 930) {
            setContainerType("desktop");
        }
        else {
            setContainerType("large");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const correctedSearch = search.replace(/\s+/g, ' '); //removing consecutive spaces if there's any
        let artist = correctedSearch.split(' ').join('+'); //replacing spaces with +

        if(artist === '') {
            artist = ' ';
        }
        
        history.push(`/songs/${artist}`)
    }

    function gotoHome() {
        history.push(`/`)
    }

    function gotoAlbums() {
        history.push(`/albums/${artist}`)
    }

    return (
        <div className="songs-page-container">
            <div className = "nav-bar">
                <button onClick={gotoHome}>Home</button>
                <button onClick={gotoAlbums}>Albums</button>
                <button style={{fontWeight:'bold'}}>Songs</button>
                <button>Login</button>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <Link to="/">
                        <img src={logo} alt="Music Search" />
                    </Link>
                    <div className="search-form">
                        <div className="input-content">
                            <input
                                placeholder={"Search artist"}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <div style={{color: '#FFF'}} className="icon-content" onClick={handleSubmit}>
                                <FaSearch size={20} style={{ marginLeft:10, marginTop: 10 }}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="songs-container">
                <ul id={containerType}>
                    {songs.map(song => (
                        <li key={song.trackId}>
                            <img src={song.artworkUrl100} alt={song.trackName} />
                            <footer>
                                <strong>{song.trackName}</strong>
                                <p>{parseInt(song.releaseDate)}</p>
                            </footer>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}