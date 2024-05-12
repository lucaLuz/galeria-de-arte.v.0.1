import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { fetchArtworkById } from '../../service/service';
import back from '../../assets/back.svg';
import { IArtwork } from '../../types/IArtworks';

export default function Art() {
  const { id } = useParams();
  const { data: artwork, isLoading, error } = useQuery<IArtwork>({
    queryKey: ['artwork', id],
    queryFn: () => fetchArtworkById(id),
  });
  const cleanDescription = (description: string | undefined) => {
    return description?.replace(/<\/?p>/g, '');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(artwork)

  return (
    <div
      className={"bg-[#0e1008]  w-full p-10"}
    >
      <Link to={"/"} className="w-full flex">
        <img src={back} alt="" />
        <p className="text-white  font-Island-Moments text-4xl ">
          Voltar
        </p>
      </Link>

      <div className="flex items-start justify-center mt-6  gap-20">
        <div className="flex flex-col items-center justify-center mb-10">
          <img className='max-w-[500px] border p-5' src={artwork?.imageUrl} alt="imagem da arte" />
        </div>
        <div className="flex flex-row gap-7 items-center justify-start relative">
          <div className="flex flex-col gap-[55px] items-center justify-start relative">
            <div className="flex flex-col gap-0 items-center justify-start relative">
              <div className="text-white text-left font-Island-Moments text-5xl relative flex items-center justify-start">
                {artwork?.title}
                <br />{" "}
              </div>
              <div className="text-white text-center font-Island-Moments text-xl relative w-[540px] flex items-center justify-center">
                {cleanDescription(artwork?.description)}
              </div>
            </div>
            <div className='flex gap-8'>
              <div className="w-full flex flex-col">
                <div className="text-white text-left font-Island-Moments text-2xl ">
                  Data: {artwork?.date_display}
                </div>
                <div className="text-white text-left font-Island-Moments text-2xl ">
                  Artista: {artwork?.artist_title}
                </div>
                <div className="text-white text-left font-Island-Moments text-2xl  ">
                  Local de origem: {artwork?.place_of_origin}
                </div>
                <div className="text-white text-left font-Island-Moments text-2xl ">
                  Dimensões: {artwork?.dimensions}
                </div>
              </div>
              <div className='w-full flex flex-col'>
                <div className="text-white text-left font-Island-Moments text-2xl ">
                  Fabricado de: {artwork?.medium_display}
                </div>
                <div className="text-white text-left font-Island-Moments text-2xl  ">
                  Direito autoral: {artwork?.copyright_notice}
                </div>
                <div className="text-white text-left font-Island-Moments text-2xl">
                  Linha de crédito: {artwork?.credit_line}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
