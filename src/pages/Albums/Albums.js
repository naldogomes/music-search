import React, { useEffect, useState } from 'react'
import './Albums.css'

import logo from '../../assets/logo.png'
import api from '../../services/api';

export default function Albums({ match }) {
    const [ albums, setAlbums ] = useState([]);
    const { artist } = match.params;

    const ENDPOINT = `/search?term=${artist}&entity=album`  

    useEffect(() => {
        async function loadAlbums() {
            
            const response = await api.get(ENDPOINT)

            setAlbums(response.data.results);      
        }

        loadAlbums();
    }, [artist])
    
    return (
        <div className="albums-container">
            <img src={logo} alt="Music Search" />
            <ul>
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
    )
}