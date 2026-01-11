import axios from 'axios';
import { Game, GameDetails, Genre, Screenshot, ApiResponse } from '@/types';

// Use our Next.js API route instead of direct RAWG API
const API_BASE = '/api/rawg';

const api = axios.create({
    baseURL: API_BASE,
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
        try {
            const queryParams = new URLSearchParams({
                endpoint: '/games',
                ...(params as any),
            });
            const { data } = await api.get<ApiResponse<Game>>(`?${queryParams.toString()}`);
            return data;
        } catch (error) {
            console.error('API Error:', error);
            return { count: 0, next: null, previous: null, results: [] };
        }
    },

    // Get game details
    getGameDetails: async (id: number): Promise<GameDetails | null> => {
        try {
            const { data } = await api.get<GameDetails>(`?endpoint=/games/${id}`);
            return data;
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    },

    // Get game screenshots
    getGameScreenshots: async (id: number): Promise<Screenshot[]> => {
        try {
            const { data } = await api.get<ApiResponse<Screenshot>>(`?endpoint=/games/${id}/screenshots`);
            return data.results || [];
        } catch (error) {
            console.error('API Error:', error);
            return [];
        }
    },

    // Get genres
    getGenres: async (): Promise<Genre[]> => {
        try {
            const { data } = await api.get<ApiResponse<Genre>>('?endpoint=/genres');
            return data.results || [];
        } catch (error) {
            console.error('API Error:', error);
            return [];
        }
    },

    // Search games
    searchGames: async (query: string): Promise<Game[]> => {
        try {
            const { data } = await api.get<ApiResponse<Game>>(`?endpoint=/games&search=${encodeURIComponent(query)}&page_size=12`);
            return data.results || [];
        } catch (error) {
            console.error('API Error:', error);
            return [];
        }
    },
};

export const getImageUrl = (url: string | null): string => {
    if (!url) return '/placeholder-game.jpg';
    // Optimize image size
    return url.replace('media/', 'media/crop/600/400/');
};
