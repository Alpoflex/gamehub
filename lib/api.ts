import { Game, ApiResponse } from '@/types';

// Mock data for development
const MOCK_GAMES: Game[] = [
    {
        id: 3498,
        name: "Grand Theft Auto V",
        background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
        rating: 4.47,
        released: "2013-09-17",
        metacritic: 92,
        platforms: [
            { platform: { id: 4, name: "PC", slug: "pc" } },
            { platform: { id: 187, name: "PlayStation 5", slug: "playstation5" } }
        ],
        genres: [
            { id: 4, name: "Action", slug: "action" },
            { id: 3, name: "Adventure", slug: "adventure" }
        ],
        parent_platforms: [
            { platform: { id: 1, name: "PC", slug: "pc" } },
            { platform: { id: 2, name: "PlayStation", slug: "playstation" } }
        ]
    },
    {
        id: 3328,
        name: "The Witcher 3: Wild Hunt",
        background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
        rating: 4.66,
        released: "2015-05-18",
        metacritic: 93,
        platforms: [
            { platform: { id: 4, name: "PC", slug: "pc" } },
            { platform: { id: 1, name: "Xbox One", slug: "xbox-one" } }
        ],
        genres: [
            { id: 4, name: "Action", slug: "action" },
            { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
        ],
        parent_platforms: [
            { platform: { id: 1, name: "PC", slug: "pc" } },
            { platform: { id: 3, name: "Xbox", slug: "xbox" } }
        ]
    }
];

export const rawgApi = {
    getGames: async (): Promise<ApiResponse<Game>> => {
        // Return mock data for now
        return {
            count: 20,
            next: null,
            previous: null,
            results: [...MOCK_GAMES, ...MOCK_GAMES, ...MOCK_GAMES, ...MOCK_GAMES, ...MOCK_GAMES].map((game, i) => ({
                ...game,
                id: game.id + i,
                name: `${game.name} ${i > 1 ? i : ''}`
            }))
        };
    },

    getGameDetails: async (id: number) => {
        return null;
    },

    getGameScreenshots: async (id: number) => {
        return [];
    },

    getGenres: async () => {
        return [
            { id: 4, name: "Action", slug: "action" },
            { id: 51, name: "Indie", slug: "indie" },
            { id: 3, name: "Adventure", slug: "adventure" },
            { id: 5, name: "RPG", slug: "role-playing-games-rpg" },
            { id: 10, name: "Strategy", slug: "strategy" },
            { id: 2, name: "Shooter", slug: "shooter" },
            { id: 40, name: "Casual", slug: "casual" },
            { id: 14, name: "Simulation", slug: "simulation" },
            { id: 7, name: "Puzzle", slug: "puzzle" },
            { id: 11, name: "Arcade", slug: "arcade" },
            { id: 83, name: "Platformer", slug: "platformer" },
            { id: 1, name: "Racing", slug: "racing" }
        ];
    },

    searchGames: async (query: string) => {
        return MOCK_GAMES.filter(g => g.name.toLowerCase().includes(query.toLowerCase()));
    },
};

export const getImageUrl = (url: string | null): string => {
    if (!url) return '/placeholder-game.jpg';
    return url;
};
