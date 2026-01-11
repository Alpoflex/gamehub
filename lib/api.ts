import { Game, ApiResponse } from '@/types';

// Mock data with more games
const MOCK_GAMES: Game[] = [
    {
        id: 3498,
        name: "Grand Theft Auto V",
        background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
        rating: 4.47,
        released: "2013-09-17",
        metacritic: 92,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 4, name: "Action", slug: "action" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    },
    {
        id: 3328,
        name: "The Witcher 3: Wild Hunt",
        background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
        rating: 4.66,
        released: "2015-05-18",
        metacritic: 93,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 5, name: "RPG", slug: "role-playing-games-rpg" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    },
    {
        id: 4200,
        name: "Portal 2",
        background_image: "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
        rating: 4.61,
        released: "2011-04-18",
        metacritic: 95,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 7, name: "Puzzle", slug: "puzzle" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    },
    {
        id: 5286,
        name: "Tomb Raider (2013)",
        background_image: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
        rating: 4.05,
        released: "2013-03-05",
        metacritic: 86,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 4, name: "Action", slug: "action" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    },
    {
        id: 13536,
        name: "Portal",
        background_image: "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
        rating: 4.51,
        released: "2007-10-09",
        metacritic: 90,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 7, name: "Puzzle", slug: "puzzle" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    },
    {
        id: 12020,
        name: "Left 4 Dead 2",
        background_image: "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
        rating: 4.09,
        released: "2009-11-17",
        metacritic: 89,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 2, name: "Shooter", slug: "shooter" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    },
    {
        id: 5679,
        name: "The Elder Scrolls V: Skyrim",
        background_image: "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
        rating: 4.42,
        released: "2011-11-11",
        metacritic: 94,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 5, name: "RPG", slug: "role-playing-games-rpg" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    },
    {
        id: 28,
        name: "Red Dead Redemption 2",
        background_image: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
        rating: 4.59,
        released: "2018-10-26",
        metacritic: 97,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 4, name: "Action", slug: "action" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    },
    {
        id: 58175,
        name: "God of War",
        background_image: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
        rating: 4.57,
        released: "2022-01-14",
        metacritic: 94,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 4, name: "Action", slug: "action" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    },
    {
        id: 32,
        name: "Destiny 2",
        background_image: "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg",
        rating: 3.54,
        released: "2017-09-06",
        metacritic: 82,
        platforms: [{ platform: { id: 4, name: "PC", slug: "pc" } }],
        genres: [{ id: 2, name: "Shooter", slug: "shooter" }],
        parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }]
    }
];

export const rawgApi = {
    getGames: async (): Promise<ApiResponse<Game>> => {
        return {
            count: MOCK_GAMES.length,
            next: null,
            previous: null,
            results: MOCK_GAMES
        };
    },

    getGameDetails: async (id: number) => {
        const game = MOCK_GAMES.find(g => g.id === id);
        if (!game) return null;
        return {
            ...game,
            description_raw: `${game.name} is an amazing game with great gameplay and story.`,
            description: `<p>${game.name} is an amazing game with great gameplay and story.</p>`,
            website: "",
            reddit_url: "",
            metacritic_url: "",
            developers: [{ id: 1, name: "Game Studio" }],
            publishers: [{ id: 1, name: "Publisher" }],
            esrb_rating: { id: 1, name: "Mature" },
            clip: { clip: "", clips: {}, video: "", preview: "" }
        };
    },

    getGameScreenshots: async () => {
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
            { id: 11, name: "Arcade", slug: "arcade" }
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
