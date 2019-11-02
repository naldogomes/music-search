import React, { useEffect, useState } from 'react'
import './Songs.css'

import logo from '../../assets/logo.png'
import api from '../../services/api';

export default function Songs({ match }) {
    const [ songs, setSongs ] = useState([]);
    const { artist } = match.params;

    const ENDPOINT = `/search?term=${artist}&entity=song` 

    useEffect(() => {
        async function loadAlbums() {
            
            const response = await api.get(ENDPOINT)
        
            setSongs(response.data.results); 
        }

        loadAlbums();
    }, [artist])

    return (
        <div className="songs-container">
            <img src={logo} alt="Music Search" />
            <ul>
                {songs.map(song => (
                    <li key={song.trackId}>
                        <img src={song.artworkUrl100} alt={song.trackName} />
                        <footer>
                            <strong>{song.trackName}</strong>
                            <p>{parseInt(song.releaseDate)}</p>
                            <p>{song.trackCount} tracks</p>
                        </footer>
                    </li>
                ))}
            </ul>
        </div>
    )
}