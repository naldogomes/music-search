import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Albums.css'

import logo from '../../assets/logo.svg'
import api from '../../services/api';

export default function Albums({ match }) {
    const [ albums, setAlbums ] = useState([]);
    const [ containerType, setContainerType ] = useState('');

    const { artist } = match.params;

    updateWindowDimensions = updateWindowDimensions.bind(this);

    const ENDPOINT = `/search?term=${artist}&entity=album&limit=100`  

    useEffect(() => {

        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        async function loadAlbums() {
            
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
    
    return (
        <div className="albums-container">
            <Link to="/">
                <img src={logo} alt="Music Search" />
            </Link>
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
    )
}