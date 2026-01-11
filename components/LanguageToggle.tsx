'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 neon-btn rounded-full text-sm font-bold"
        >
            <Languages size={18} />
            {language === 'en' ? 'TR' : 'EN'}
        </button>
    );
}
