import React, { useState, useEffect, useMemo } from 'react';
import ListagemCard from '../../components/listagem/listagem-cards';
import { useQuery } from '@tanstack/react-query';
import { fetchArtworks } from '../../service/service';
import { IArtwork } from '../../types/IArtworks';
import back from '../../assets/back.svg';
import pesquisa from '../../assets/search.svg';
import { Link } from 'react-router-dom';

export default function Favorites() {
    const [favoriteArtworks, setFavoriteArtworks] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState<boolean>();

    const { data: artworks, isLoading, isError } = useQuery<IArtwork[]>({
        queryKey: ['artworks'],
        queryFn: fetchArtworks,
    });

    const favoriteArtworkDetails = useMemo(() => {
        return artworks?.filter(artwork =>
            favoriteArtworks.includes(artwork.id) &&
            (artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                artwork.artist_title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [artworks, favoriteArtworks, searchTerm]);


    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavoriteArtworks(favorites);
    }, [isFavorite]);

    return (
        <div className='w-full bg-[#0E1008] min-h-screen'>
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <img src={pesquisa} alt="search" />
                    </div>
                </div>
                <hr />
            </div>

            <div className='w-full mt-5 p-10 flex-wrap flex gap-40 justify-center'>
                {isLoading && <div className='w-full min-h-screen bg-[#0E1008] justify-center items-center'>
                    <p className='font-Island-Moments text-[80px] text-white'>
                        Loading...
                    </p>
                </div>}
                {isError &&
                    <div className='w-full min-h-screen bg-[#0E1008] justify-center items-center'>
                        <p className='font-Island-Moments text-[80px] text-white'>
                            Error
                        </p>
                    </div>
                }
                {favoriteArtworkDetails && favoriteArtworkDetails.map((artwork) => (
                    <ListagemCard
                        key={artwork.id}
                        id={artwork.id}
                        name={artwork.title}
                        artist={artwork.artist_title}
                        image={artwork.imageUrl}
                        onClick={(e) => setIsFavorite(e)}
                    />
                ))}
            </div>
        </div>
    );
}
