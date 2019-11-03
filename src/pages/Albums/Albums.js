import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import './Albums.css'

import logo from '../../assets/logo.svg'
import api from '../../services/api';

export default function Albums({ history, match }) {
    const [ search, setSearch ] = useState('');
    const [ albums, setAlbums ] = useState([]);
    const [ containerType, setContainerType ] = useState('');

    const { artist } = match.params;

    useEffect(() => {
        setAlbums([]);
        let correctedSearch = artist.split('+').join(' ');
        setSearch(correctedSearch);
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        async function loadAlbums() {
            const ENDPOINT = `/search?term=${artist}&entity=album&limit=100`  
            const response = await api.get(ENDPOINT)

            setAlbums(response.data.results);      
        }

        loadAlbums();
    }, [artist])

    useEffect(() => {
        return () => {
            window.removeEventListener('resize', updateWindowDimensions);
        }
    }, []);
      
    function updateWindowDimensions() {
        if(window.innerWidth <= 720) {
            setContainerType('mobile');
        }
        else if(window.innerWidth > 720 && window.innerWidth <= 930) {
            setContainerType('desktop');
        }
        else {
            setContainerType('large');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const correctedSearch = search.replace(/\s+/g, ' '); //removing consecutive spaces if there's any
        let artist = correctedSearch.split(' ').join('+'); //replacing spaces with +

        if(artist === '') {
            artist = ' ';
        }
        
        history.push(`/albums/${artist}`)
    }

    function gotoHome() {
        history.push(`/`)
    }

    function gotoSongs() {
        history.push(`/songs/${artist}`)
    }
    
    return (
        <div className="albums-page-container">
            <div className = "nav-bar">
                <button onClick={gotoHome}>Home</button>
                <button style={{fontWeight:'bold'}}>Albums</button>
                <button onClick={gotoSongs}>Songs</button>
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
            <div className="albums-container">
                <ul id={containerType}>
                    {albums.map(album => (
                        <li key={album.collectionId}>
                            <img src={album.artworkUrl100} alt={album.collectionName} />
                            <footer>
                                <strong>{album.collectionName}</strong>
                                <p>{parseInt(album.releaseDate)}</p>
                                <p>{album.trackCount} tracks</p>
                            </footer>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}