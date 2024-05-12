import React, { useEffect, useState } from 'react';
import imagem1 from '../../assets/image-1.png';
import imagem2 from '../../assets/image-2.png';
import imagem3 from '../../assets/image-3.png';
import imagem4 from '../../assets/image-4.png';
import imagem5 from '../../assets/image-5.png';
import garrafa from '../../assets/big-wine.svg';
import { Link } from 'react-router-dom';

const imagesData = [
  {
    title: 'Parallel Manipulation',
    description: 'Christina Ramberg is known for enigmatic paintings of fragments of the female body—typically torsos, legs, and hands—tightly cropped and partially clothed, bound, or veiled. The formal clarity, stylized figuration, and references to Surrealism and popular culture in her works aligned her with the Chicago Imagists, who she exhibited with in the False Image exhibitions at the Hyde Park Art Center in the late 1960s...',
    src: imagem1,
  },
  {
    title: 'A Weaving',
    description: 'A Weaving depicts an infinite loop of colorful striped thread that gives the illusion of three-dimensionality on a two-dimensional surface. As an educator and artist, James Bassler makes work that honors the historical weaving techniques that he has studied, practiced, and shared with his students throughout his career. Here, instead of the normal perpendicular crossings of warps and wefts, he used wedge weaving, which diverts the wefts to the diagonal. Thus, the work pays his respects to both ancient Peruvian and Diné (Navajo) cultural traditions from which wedge weaving originates.',
    src: imagem2,
  },
  {
    title: 'Bag Work',
    description: 'Konno Tomoko (born 1967), Aoki Katsuyo (born 1972), and Oishi Sayaka (born 1979) are part of younger generations and are represented by thematic groupings ranging from bodily distortion to fantastical decoration. While all of these women have routinely confronted expectations about their practice, they have frequently responded by refusing gender-imposed constraints, whether by approaching traditionally “feminine” subjects—such as flowers—in unconventional ways or by creating so-called “masculine” works, such as large, geological forms...',
    src: imagem3,
  },
  {
    title: 'A Sunday on La Grande Jatte',
    description: 'In his best-known and largest painting, Georges Seurat depicted people from different social classes strolling and relaxing in a park just west of Paris on La Grande Jatte, an island in the Seine River. Although he took his subject from modern life, Seurat sought to evoke the sense of timelessness associated with ancient art, especially Egyptian and Greek sculpture. He once wrote, “I want to make modern people, in their essential traits, move about as they do on those friezes, and place them on canvases organized by harmonies of color.”',
    src: imagem4,
  },
  {
    title: 'Water Lilies',
    description: 'One instant, one aspect of nature contains it all,” said Claude Monet, referring to his late masterpieces, the water landscapes that he produced at his home in Giverny between 1897 and his death in 1926. These works replaced the varied contemporary subjects he had painted from the 1870s through the 1890s with a single, timeless motif—water lilies. The focal point of these paintings was the artist’s beloved ﬂower garden, which featured a water garden and a smaller pond spanned by a Japanese footbridge. In his first water-lily series (1897–99), Monet painted the pond environment, with its plants, bridge, and trees neatly divided by a fixed horizon...',
    src: imagem5,
  },
];

export default function Carrosel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className='w-full text-[0px] bg-[#0d0f08] items-center justify-center overflow-hidden bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url(${imagesData[currentIndex].src})`,
      }}>
      <div
        className="w-full h-[749px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0, 0, 0, 0.00) 0%,rgba(14, 16, 8, 0.80) 100%)",
          transition: "opacity 0.s ease-in-out"
        }}
      >
        <div className='w-full p-9'>
          <div className='flex justify-between w-full'>
            <p className="font-Lavishly-Yours text-2xl  text-white ">
              Garden Studio
            </p>
            <Link to={'/favorites'} className='font-Island-Moments items-end flex gap-2 text-2xl text-white border p-2'>
              <img src={garrafa} alt="" />
              <p>
              Favorites
              </p>
            </Link>
          </div>

          <p className="flex w-full flex-col items-center font-Island-Moments text-[48px] text-white">
            {imagesData[currentIndex].title}
          </p>
          <hr />
          <div className='flex w-full justify-end py-20'>
            <p className="flex max-w-[794px] justify-center items-center font-Island-Moments text-3xl  text-white  text-center ">
              {imagesData[currentIndex].description}
            </p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}
