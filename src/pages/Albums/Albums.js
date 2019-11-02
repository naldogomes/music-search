import React, { useEffect, useState } from 'react'
import './Albums.css'

import logo from '../../assets/logo.png'
import api from '../../services/api';

export default function Albums({ match }) {
    const [ albums, setalbums ] = useState([]);
    const { artist } = match.params;

    const ENDPOINT = `/search?term=${artist}&entity=album`  

    useEffect(() => {
        async function loadAlbums() {
            
            const response = await api.get(ENDPOINT)

            // console.log(response.data.results[0]);
            

            setalbums(response.data.results);


            console.log(albums);
            
        }

        loadAlbums();
    }, [artist])
    
    return (
        <div className="albums-container">
            <img src={logo} alt="Music Search" />
            <ul>
                {albums.map(album => (
                    <li>
                        <img src={album.artworkUrl100} alt="Album" />
                        <card>
                            <strong>{album.collectionName}</strong>
                            <p>{parseInt(album.releaseDate)}</p>
                            <p>{album.trackCount} tracks</p>
                        </card>
                    </li>
                ))}
            </ul>
        </div>
    )
}