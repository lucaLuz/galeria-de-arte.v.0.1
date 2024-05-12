import { useQuery } from '@tanstack/react-query';
import Carrosel from '../../components/carrosel-header';
import Listagem from '../../components/listagem';
import { fetchArtworks } from '../../service/service';
import Footer from '../../components/footer';


export default function Home() {
  const { data: artworks, isLoading, isError } = useQuery({
    queryKey: ['artworks'],
    queryFn: fetchArtworks,
});

  return (
    <>
      <Carrosel />
      <Listagem 
      artworks={artworks}
      isError={isError}
      isLoading={isLoading}/>
      <Footer/>
    </>
  )
}
