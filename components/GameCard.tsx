'use client';

import { Game } from '@/types';
import { getImageUrl } from '@/lib/api';
import { formatRating, getPlatformIcon } from '@/lib/utils';
import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Link href={`/game/${game.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="game-card rounded-xl overflow-hidden cursor-pointer relative"
            >
                <img
                    src={getImageUrl(game.background_image)}
                    alt={game.name}
                    className="w-full h-56 object-cover"
                />

                <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{game.name}</h3>

                    <div className="flex items-center justify-between mb-3">
                        {game.rating > 0 ? (
                            <div className="flex items-center gap-1">
                                <Star size={16} className="text-yellow-400" fill="currentColor" />
                                <span className="text-yellow-400 font-semibold text-sm">{formatRating(game.rating)}</span>
                            </div>
                        ) : (
                            <span className="text-gray-500 text-sm">No rating</span>
                        )}
                        {game.released && (
                            <span className="text-gray-400 text-sm">{new Date(game.released).getFullYear()}</span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {game.parent_platforms?.slice(0, 4).map((p) => (
                            <span
                                key={p.platform.id}
                                className="platform-badge px-2 py-1 rounded text-xs"
                                title={p.platform.name}
                            >
                                {getPlatformIcon(p.platform.name)}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {game.genres?.slice(0, 2).map((genre) => (
                            <span
                                key={genre.id}
                                className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsFavorite(!isFavorite);
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm"
                >
                    <Heart
                        size={20}
                        className={isFavorite ? 'text-pink-500 fill-pink-500' : 'text-white'}
                    />
                </button>

                {game.metacritic && (
                    <div className="absolute top-3 left-3 rating-badge px-3 py-1.5 rounded-lg">
                        <span className="text-white font-bold text-sm">{game.metacritic}</span>
                    </div>
                )}
            </motion.div>
        </Link>
    );
}
