import axios from 'axios';
import { Game, GameDetails, Genre, Screenshot, ApiResponse } from '@/types';

// RAWG API - Free tier: 20,000 requests/month
const API_KEY = 'ded6383e44a74727b02d7e093e7c2c32';
const BASE_URL = 'https://api.rawg.io/api';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    },
});

export const rawgApi = {
    // Get games list
    getGames: async (params?: {
        page?: number;
        page_size?: number;
        search?: string;
        genres?: string;
        platforms?: string;
        ordering?: string;
    }): Promise<ApiResponse<Game>> => {
        const { data } = await api.get<ApiResponse<Game>>('/games', { params });
        return data;
    },

    // Get game details
    getGameDetails: async (id: number): Promise<GameDetails> => {
        const { data } = await api.get<GameDetails>(`/games/${id}`);
        return data;
    },

    // Get game screenshots
    getGameScreenshots: async (id: number): Promise<Screenshot[]> => {
        const { data } = await api.get<ApiResponse<Screenshot>>(`/games/${id}/screenshots`);
        return data.results;
    },

    // Get genres
    getGenres: async (): Promise<Genre[]> => {
        const { data } = await api.get<ApiResponse<Genre>>('/genres');
        return data.results;
    },

    // Search games
    searchGames: async (query: string): Promise<Game[]> => {
        const { data } = await api.get<ApiResponse<Game>>('/games', {
            params: { search: query, page_size: 12 },
        });
        return data.results;
    },
};

export const getImageUrl = (url: string | null): string => {
    if (!url) return '/placeholder-game.jpg';
    return url.replace('media/', 'media/crop/600/400/');
};
