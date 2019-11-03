import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Songs.css'

import logo from '../../assets/logo.png'
import api from '../../services/api';

export default function Songs({ match }) {
    const [ songs, setSongs ] = useState([]);
    const [ containerType, setContainerType ] = useState('');

    const { artist } = match.params;

    updateWindowDimensions = updateWindowDimensions.bind(this);

    const ENDPOINT = `/search?term=${artist}&entity=song&limit=100` 

    useEffect(() => {

        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        async function loadAlbums() {
            
            const response = await api.get(ENDPOINT)
        
            setSongs(response.data.results); 
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
            setContainerType("mobile");
        }
        else if(window.innerWidth > 720 && window.innerWidth <= 930) {
            setContainerType("desktop");
        }
        else {
            setContainerType("large");
        }
    }

    return (
        <div className="songs-container">
            <Link to="/">
                <img src={logo} alt="Music Search" />
            </Link>
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
    )
}