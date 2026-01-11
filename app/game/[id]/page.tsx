'use client';

import { use, useEffect, useState } from 'react';
import { rawgApi, getImageUrl } from '@/lib/api';
import { GameDetails } from '@/types';
import { formatRating } from '@/lib/utils';
import { Star, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [game, setGame] = useState<GameDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGame();
    }, [id]);

    const loadGame = async () => {
        try {
            const data = await rawgApi.getGameDetails(parseInt(id));
            setGame(data);
        } catch (error) {
            console.error('Error loading game:', error);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-white">Loading...</div>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-white">Game not found</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen">
            {/* Backdrop */}
            <div className="relative h-[70vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${getImageUrl(game.background_image)})`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-[#0f0f23]/70 to-transparent" />

                <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20">
                    <Link
                        href="/"
                        className="absolute top-8 left-6 flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all backdrop-blur-sm"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 glow-text">
                            {game.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {game.rating > 0 && (
                                <div className="flex items-center gap-2 rating-badge px-4 py-2 rounded-full">
                                    <Star size={20} fill="currentColor" className="text-yellow-400" />
                                    <span className="font-bold text-lg text-white">{formatRating(game.rating)}</span>
                                </div>
                            )}
                            {game.metacritic && (
                                <div className="rating-badge px-4 py-2 rounded-full">
                                    <span className="font-bold text-lg text-white">Meta: {game.metacritic}</span>
                                </div>
                            )}
                            {game.released && (
                                <div className="flex items-center gap-2 text-white/80">
                                    <Calendar size={18} />
                                    <span>{new Date(game.released).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {game.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 font-semibold"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-white mb-4">About</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            {game.description_raw}
                        </p>

                        {game.developers && game.developers.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">Developer</h3>
                                <p className="text-purple-400">{game.developers.map(d => d.name).join(', ')}</p>
                            </div>
                        )}

                        {game.publishers && game.publishers.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">Publisher</h3>
                                <p className="text-purple-400">{game.publishers.map(p => p.name).join(', ')}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <img
                            src={getImageUrl(game.background_image)}
                            alt={game.name}
                            className="w-full rounded-xl shadow-2xl border-2 border-purple-500/30"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
