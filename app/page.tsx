'use client';

import { useState, useEffect } from 'react';
import { rawgApi } from '@/lib/api';
import { Game, Genre } from '@/types';
import GameCard from '@/components/GameCard';
import { Gamepad2, TrendingUp, Trophy, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [trending, setTrending] = useState<Game[]>([]);
  const [topRated, setTopRated] = useState<Game[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [search Query, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
    loadGenres();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchGames();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedGenre) {
      loadGenreGames();
    } else {
      loadGames();
    }
  }, [selectedGenre]);

  const loadGames = async () => {
    setLoading(true);
    try {
      const [gamesData, trendingData, topData] = await Promise.all([
        rawgApi.getGames({ page_size: 20 }),
        rawgApi.getGames({ ordering: '-added', page_size: 10 }),
        rawgApi.getGames({ ordering: '-rating', page_size: 10 }),
      ]);
      setGames(gamesData.results);
      setTrending(trendingData.results);
      setTopRated(topData.results);
    } catch (error) {
      console.error('Error loading games:', error);
    }
    setLoading(false);
  };

  const loadGenres = async () => {
    try {
      const data = await rawgApi.getGenres();
      setGenres(data.slice(0, 12));
    } catch (error) {
      console.error('Error loading genres:', error);
    }
  };

  const loadGenreGames = async () => {
    if (!selectedGenre) return;
    setLoading(true);
    try {
      const data = await rawgApi.getGames({ genres: selectedGenre.toString(), page_size: 20 });
      setGames(data.results);
    } catch (error) {
      console.error('Error loading genre games:', error);
    }
    setLoading(false);
  };

  const searchGames = async () => {
    try {
      const results = await rawgApi.searchGames(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching games:', error);
    }
  };

  return (
    <main className="min-h-screen pb-20">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <Gamepad2 size={64} className="mx-auto mb-6 text-purple-500" />
          <h1 className="text-6xl md:text-8xl font-black mb-4 glow-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
            GameHub
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Discover Your Next Favorite Game
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search 500,000+ games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white/5 backdrop-blur-md border-2 border-purple-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Search size={32} className="text-purple-500" />
              Search Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {/* Genre Filter */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Filter size={28} className="text-purple-500" />
            <h3 className="text-2xl font-bold text-white">Browse by Genre</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(selectedGenre === genre.id ? null : genre.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedGenre === genre.id
                    ? 'neon-btn'
                    : 'bg-white/5 text-white hover:bg-white/10 border-2 border-purple-500/30'
                  }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <TrendingUp size={32} className="text-pink-500" />
            Trending Now
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="skeleton h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {trending.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </section>

        {/* All Games */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Gamepad2 size={32} className="text-blue-500" />
            {selectedGenre
              ? `${genres.find(g => g.id === selectedGenre)?.name} Games`
              : 'All Games'}
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="skeleton h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </section>

        {/* Top Rated */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Trophy size={32} className="text-yellow-400" />
            Top Rated
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="skeleton h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {topRated.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
