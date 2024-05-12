import wine from '../../../assets/wine.svg'
import wineFill from '../../../assets/wine-fill.svg'
import line from '../../../assets/Line.svg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface ListagemCardProps {
    id?: number;
    name?: string;
    artist?: string;
    image?: string;
    onClick?: (value: boolean) => void;
}

export default function ListagemCard({ id, name, artist, onClick, image }: ListagemCardProps) {
    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites.includes(id);
    });

    const handleClick = () => {
        setIsFavorite((prevIsFavorite: any) => {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            const updatedFavorites = prevIsFavorite
                ? favorites.filter((favoriteId: number) => favoriteId !== id)
                : [...favorites, id];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            if(onClick){
                onClick(isFavorite)
            }
            if (prevIsFavorite) {
                toast.success('Arte removida dos favoritos');
            } else {
                toast.success('Arte adicionada aos favoritos');
            }
            return !prevIsFavorite;
        });
    };

    return (
            <div className="max-w-[403px] w-full  bg-cover bg-no-repeat p-5 flex flex-col items-center"
                style={{
                    backgroundImage: `url(${line})`,
                }}>
                <div className="flex flex-col gap-4 items-center justify-center ">
                    <Link to={`../art/${id}`}>
                        <img className="border-solid w-[324px] h-[279px] bg-cover" src={image} alt='imagem' />
                    </Link>
                    <div className="flex items-start justify-between w-full">
                        <div className="flex flex-col items-start justify-start">
                            <div className="text-white text-left font-Island-Moments text-[48px] flex items-center justify-start">
                                {name}
                            </div>
                            <div className="text-white text-left font-Reddit-Mono font-thin text-xl relative flex items-center justify-start">
                                {artist}
                            </div>
                        </div>
                        <img
                            className="w-[19.09px] h-[21px] relative overflow-visible cursor-pointer"
                            src={isFavorite ? wineFill : wine}
                            alt='imagem'
                            onClick={handleClick}
                        />
                    </div>
                </div>
            <Toaster />

            </div>
    )
}
