import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import api from '../../services/api';
import './Home.css';

import logo from '../../assets/logo.svg';

export default function Home({ history }) {
    const [ search, setSearch ] = useState('');
    const [ select, setSelect ] = useState('album');
    const [ content, setContent ] = useState([]);
    const [ containerType, setContainerType ] = useState('');

    useEffect(() => {
        setContent([]); 
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        async function loadContent() {
            const ENDPOINT = `/search?term=album&entity=${select}&limit=100` 
            const response = await api.get(ENDPOINT)

            setContent(response.data.results);      
        }

        loadContent();
    }, [select])

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
        
        if(select === 'album') {
            history.push(`/albums/${artist}`)
        }
        else {
            history.push(`/songs/${artist}`)
        }  
    }

    function gotoAlbums() {
        history.push(`/albums/ `)
    }

    function gotoSongs() {
        history.push(`/songs/ `)
    }

    return (
        <div className="home-container">
            <div className = "nav-bar">
                <button style={{fontWeight:'bold'}}>Home</button>
                <button onClick={gotoAlbums}>Albums</button>
                <button onClick={gotoSongs}>Songs</button>
                <button>Login</button>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <img src={logo} alt="Music Search" />
                    <div className="search-form">
                        <select value={select} onChange={e => setSelect(e.target.value)}>
                            <option value="album">Albums</option>
                            <option value="song">Songs</option>
                        </select>
                        <div className="input-content">
                            <input
                                placeholder="Search artist"
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
            <div className="list-container">
                <ul id={containerType}>
                        {content.map(content => (
                            <li key={select === 'album'? content.collectionId : content.trackId}>
                                <img src={content.artworkUrl100} alt={content.collectionName} />
                                <footer>
                                    <strong>{select === 'album'? content.collectionName : content.trackName}</strong>
                                    <p>{parseInt(content.releaseDate)}</p>
                                    {select === 'album'? 
                                        <p>{content.trackCount} tracks</p>
                                    :
                                        null
                                    }
                                    
                                </footer>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}