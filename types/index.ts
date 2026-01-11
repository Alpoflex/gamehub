export interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
    metacritic: number;
    platforms: Platform[];
    genres: Genre[];
    parent_platforms: ParentPlatform[];
}

export interface GameDetails extends Game {
    description_raw: string;
    description: string;
    website: string;
    reddit_url: string;
    metacritic_url: string;
    developers: Developer[];
    publishers: Publisher[];
    esrb_rating: ESRBRating;
    clip: Clip;
}

export interface Platform {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface ParentPlatform {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
}

export interface Developer {
    id: number;
    name: string;
}

export interface Publisher {
    id: number;
    name: string;
}

export interface ESRBRating {
    id: number;
    name: string;
}

export interface Clip {
    clip: string;
    clips: Record<string, string>;
    video: string;
    preview: string;
}

export interface Screenshot {
    id: number;
    image: string;
}

export interface ApiResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
