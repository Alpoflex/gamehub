'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        tagline: "Discover Your Next Favorite Game",
        searchPlaceholder: "Search 500,000+ games...",

        searchResults: "Search Results",
        browseGenre: "Browse by Genre",
        trendingNow: "Trending Now",
        allGames: "All Games",
        topRated: "Top Rated",
        noGamesFound: "No games found",

        about: "About",
        developer: "Developer",
        publisher: "Publisher",
        back: "Back",

        loading: "Loading...",
        gameNotFound: "Game not found",
    },
    tr: {
        tagline: "Bir Sonraki Favori Oyununu Keşfet",
        searchPlaceholder: "500,000+ oyun ara...",

        searchResults: "Arama Sonuçları",
        browseGenre: "Türe Göre Gözat",
        trendingNow: "Şu An Trend",
        allGames: "Tüm Oyunlar",
        topRated: "En İyi Puanlananlar",
        noGamesFound: "Oyun bulunamadı",

        about: "Hakkında",
        developer: "Geliştirici",
        publisher: "Yayıncı",
        back: "Geri",

        loading: "Yükleniyor...",
        gameNotFound: "Oyun bulunamadı",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.en] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
