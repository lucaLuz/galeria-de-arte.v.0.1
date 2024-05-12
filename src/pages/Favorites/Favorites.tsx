import React, { useState, useEffect } from 'react';
import ListagemCard from '../../components/listagem/listagem-cards';
import { useQuery } from '@tanstack/react-query';
import { fetchArtworks } from '../../service/service';
import { IArtwork } from '../../types/IArtworks';
import back from '../../assets/back.svg';
import { Link } from 'react-router-dom';
import pesquisa from '../../assets/search.svg';


export default function Favorites() {
    const [favoriteArtworks, setFavoriteArtworks] = useState<any[]>([]);
    const { data: artworks, isLoading, isError } = useQuery<IArtwork[]>({
        queryKey: ['artworks'],
        queryFn: fetchArtworks,
    });


    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavoriteArtworks(favorites);
    }, []);

    const favoriteArtworkDetails = artworks?.filter(artwork => favoriteArtworks.includes(artwork.id));

    return (
        <div className='w-full bg-[#0E1008]'>
            <div className='w-full p-10'>
                <Link to={"/"} className="w-full flex">
                    <img src={back} alt="" />
                    <p className="text-white  font-Island-Moments text-4xl ">
                        Back
                    </p>
                </Link>
                <div className='flex justify-between mb-2 items-center'>
                    <h1 className='font-Island-Moments text-[56px] text-white'>Favorites</h1>
                    <div className='flex border pr-2'>
                        <input
                            placeholder='Search'
                            className='w-[400px] h-10 bg-transparent p-2 text-white outline-none'
                            value={''}
                        />
                        <img src={pesquisa} alt="search" />
                    </div>
                </div>
                <hr />
            </div>

            <div className='w-full mt-5 p-10 flex-wrap flex gap-40 justify-center'>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error</p>}
                {favoriteArtworkDetails && favoriteArtworkDetails.map((artwork) => (
                    <ListagemCard
                        key={artwork.id}
                        id={artwork.id.toString()}
                        name={artwork.title}
                        artist={artwork.artist_title}
                        image={artwork.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}
