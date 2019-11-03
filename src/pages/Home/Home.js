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

    updateWindowDimensions = updateWindowDimensions.bind(this);

    useEffect(() => {
        setContent([]); 
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        const ENDPOINT = `/search?term=album&entity=${select}&limit=100` 

        async function loadContent() {
            
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
        const artist = correctedSearch.split(' ').join('+'); //replacing spaces with +
        
        if(select === 'album') {
            history.push(`/albums/${artist}`)
        }
        else {
            history.push(`/songs/${artist}`)
        }  
    }

    return (
        <div className="home-container">
            <div className = "nav-bar">
                <p>Home</p>
                <p>Albums</p>
                <p>Songs</p>
                <p>Login</p>
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
                            <li key={content.collectionId}>
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