import axios from 'axios';
import { IArtwork } from '../types/IArtworks';

const IIIF_BASE_URL = 'https://www.artic.edu/iiif/2';

const fetchArtworks = async () => {
    try {
        const response = await axios.get('https://api.artic.edu/api/v1/artworks');
        const artworks = response.data.data
            .filter((artwork: IArtwork ) => artwork.image_id)
            .map((artwork: IArtwork) => ({
                ...artwork,
                imageUrl: `${IIIF_BASE_URL}/${artwork.image_id}/full/843,/0/default.jpg`
            }));
        return artworks;
    } catch (error) {
        console.error('Erro ao buscar obras de arte:', error);
        throw error;
    }
};

const fetchArtworkById = async (id: string | undefined) => {
    try {
        const response = await axios.get(`https://api.artic.edu/api/v1/artworks/${id}`);
        const artwork = response.data.data;
        if (!artwork.image_id) {
            throw new Error('A obra de arte não possui uma imagem associada.');
        }
        artwork.imageUrl = `${IIIF_BASE_URL}/${artwork.image_id}/full/843,/0/default.jpg`;
        return artwork;
    } catch (error) {
        console.error(`Erro ao buscar a obra de arte com o ID ${id}:`, error);
        throw error;
    }
};

export { fetchArtworks, fetchArtworkById };
