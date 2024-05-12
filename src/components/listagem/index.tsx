import React, { useState } from 'react';
import ListagemCard from './listagem-cards';
import  pesquisa  from '../../assets/search.svg';
import { Toaster } from 'react-hot-toast';

interface ListagemProps {
    artworks: any[];
    isLoading: boolean;
    isError: boolean;
}

export default function Listagem({ artworks, isError, isLoading }: ListagemProps) {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    const filteredArtworks = artworks ? artworks.filter((artwork) => {
        const lowerCaseSearchText = searchText.toLowerCase();
        const titleIncludesSearchText = artwork.title.toLowerCase().includes(lowerCaseSearchText);
        const artistIncludesSearchText = artwork.artist_title.toLowerCase().includes(lowerCaseSearchText);
        return titleIncludesSearchText || artistIncludesSearchText;
    }) : [];

    return (
        <div className='w-full bg-[#0E1008]'>
            <div className='w-full p-10'>
                <div className='flex justify-between mb-2 items-center'>
                    <h1 className='font-Island-Moments text-[56px] text-white'>Exhibitions</h1>
                    <div className='flex border pr-2'>
                        <input
                            placeholder='Search'
                            className='w-[400px] h-10 bg-transparent p-2 text-white outline-none'
                            value={searchText}
                            onChange={handleSearchInputChange}
                        />
                        <img src={pesquisa} alt="search" />
                    </div>
                </div>
                <hr />
            </div>
            <div className='w-full mt-5 p-10 flex-wrap flex gap-40 justify-center'>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error</p>}
                {filteredArtworks.map((artwork) => (
                    <ListagemCard
                        key={artwork.id}
                        id={artwork.id}
                        name={artwork.title}
                        artist={artwork.artist_title}
                        image={artwork.imageUrl}
                    />
                ))}
            </div>
            <Toaster />
        </div>
    );
}
