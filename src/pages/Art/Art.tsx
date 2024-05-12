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

  if (isLoading) return <div className='w-full min-h-screen bg-[#0E1008] justify-center items-center'>
  <p className='font-Island-Moments text-[80px] text-white'>
      Loading...
  </p>
</div>;
  if (error) return  <div className='w-full min-h-screen bg-[#0E1008] justify-center items-center'>
  <p className='font-Island-Moments text-[80px] text-white'>
      Error: {error.message}
  </p>
</div>;
  console.log(artwork)

  return (
    <div
      className={"bg-[#0e1008]  w-full p-10"}
    >
      <Link to={"/"} className="w-full flex">
        <img src={back} alt="" />
        <p className="text-white  font-Island-Moments text-4xl ">
          Back
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
              <div className="w-full flex flex-col gap-2">
                <div className="text-white text-left font-Reddit-Mono text-base  font-thin">
                  Date: {artwork?.date_display}
                </div>
                <div className="text-white text-left font-Reddit-Mono text-base  font-thin">
                  Artist: {artwork?.artist_title}
                </div>
                <div className="text-white text-left font-Reddit-Mono text-base  font-thin ">
                  Place: {artwork?.place_of_origin} (Object made in)
                </div>
                <div className="text-white text-left font-Reddit-Mono text-base  font-thin">
                  Dimensions: {artwork?.dimensions}
                </div>
              </div>
              <div className='w-full flex flex-col gap-2'>
                <div className="text-white text-left font-Reddit-Mono text-base  font-thin">
                  Medium: {artwork?.medium_display}
                </div>
                <div className="text-white text-left font-Reddit-Mono text-base  font-thin">
                  Credit Line: {artwork?.credit_line}
                </div>
                <div className="text-white text-left font-Reddit-Mono text-base  font-thin ">
                  Copyright: {artwork?.copyright_notice}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
